import { User } from './../models/user';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users =  Array <User>();
  formvalid = true;
  Name = "";
  Age = "";
  Email = "";
  Details = "";

  user_id:number;
  idFromBtn;
  userDataById = [];
  userData = [];
  @ViewChild('pdfContent',{static: false}) pdfContent:ElementRef;

  // profileForm = new FormGroup({
  //   name: new FormControl(''),
  //   user_age: new FormControl(''),
  //   user_email: new FormControl(''),
  //   user_details: new FormControl(''),
  // });

  profileForm = this.fb.group({
    name: [''],
    user_age: [''],
    user_email: [''],
    user_details: [''],
    id: ['']
  });

  
  constructor(public apiService: UserService, public fb:FormBuilder) { 
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
      this.Name = "";
      this.Age = "";
      this.Email = "";
      this.Details = "";
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

  getData(user_id){
    let data = {id:user_id}
    this.apiService.getUserById(data)
    .subscribe(response=>{
      this.userDataById = response;
      
      this.Name = this.userDataById[0].name;
      this.Age = this.userDataById[0].user_age;
      this.Email = this.userDataById[0].user_email;
      this.Details = this.userDataById[0].user_details;
    })
  }
  onUpdate(userdatas){
    this.apiService.updateUser(userdatas)
    .subscribe(response=>{
    this.userData = response;
    let id = this.profileForm.value.id;
    let name = this.profileForm.value.name;
    let age = this.profileForm.value.user_age;
    let email = this.profileForm.value.user_email;
    let details = this.profileForm.value.user_details;
    let userdatas = {id:id,name:name,user_age:age,user_email:email,user_details:details}
    // console.log(userdatas);
    // console.log(this.userData);
  })

}
}
