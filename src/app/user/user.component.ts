import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { FormControl,FormGroup } from '@angular/forms';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users =  Array <User>();
  formvalid = true;
  clearName = null;
  clearAge = null;
  clearEmail = null;
  clearDetails = null;
  user_id:number;
  @ViewChild('pdfContent',{static: false}) pdfContent:ElementRef;

  profileForm = new FormGroup({
    name: new FormControl(''),
    user_age: new FormControl(''),
    user_email: new FormControl(''),
    user_details: new FormControl(''),
  });

  constructor(public apiService: UserService) { 
    this.getAllUsers();
  }

  ngOnInit() {
  }
  getAllUsers(){
    this.apiService.getUsers()
    .subscribe((response :any[])=>{
          this.users = response;
    })
  }

  onSubmit() {
    this.apiService.addUser(this.profileForm.value)
    .subscribe((response :any[])=>{
      this.profileForm.value == null;
      this.clearName = null;
      this.clearAge = null;
      this.clearEmail = null;
      this.clearDetails = null;
      this.apiService.getUsers()
      .subscribe((response :any[])=>{
            this.users = response;
      })
    })
  }
  deleteUser(user_id){
    let userId = {id:user_id};
    this.apiService.deleteUser(userId)
    .subscribe((response)=>{
      this.apiService.getUsers()
      .subscribe((response :any[])=>{
            this.users = response;
      })
    })

  }

  onPdf(){
    let doc = new jsPDF;
    let specialElementHandlers = {
      '#editor':function(element,renderer){
        return true;
      }
    };
     
    let content = this.pdfContent.nativeElement;

    doc.fromHTML(content.innerHTML,15,15,{
      'width' : 190,
      'elementHandlers' : specialElementHandlers
    });
    doc.save('test.pdf');
  }

}
