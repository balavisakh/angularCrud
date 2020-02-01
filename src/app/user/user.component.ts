import { User } from './../models/user';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users =  Array <User>();
  // formvalid = true;
  Name;
  Age;
  Email;
  Details;
  formSubmit = false;

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
    name: ['',Validators.required],
    user_age: ['',Validators.required],
    user_email: ['',Validators.required],
    user_details: ['',Validators.required],
    id: ['']
  });
  usersId: any;

  
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
    if(this.profileForm.valid){
    this.formSubmit = true;
    this.apiService.addUser(this.profileForm.value)
    .subscribe((response :any[])=>{
      this.profileForm.reset();
      this.apiService.getUsers()
      .subscribe((response :any[])=>{
            this.users = response;
      })
    })
  }
    else{
      this.formSubmit = false;
      this.profileForm.markAllAsTouched();
    }
  }
  deleteUser(user_id){
    var deleteUser = confirm('Are you sure you want to delete ?');
    if(deleteUser){
      let userId = {id:user_id};
    this.apiService.deleteUser(userId)
    .subscribe((response)=>{
      this.apiService.getUsers()
      .subscribe((response :any[])=>{
            this.users = response;
      })
    })
    }
  }

  onPdf(){
    let doc = new jsPDF;
    let specialElementHandlers = {
      '#editor':function(element,renderer){
        return true;
      }
    };
     console.log(specialElementHandlers,'jhjhjhj');
    let content = this.pdfContent.nativeElement;
console.log(content,'hjhg')
    doc.fromHTML(content.innerHTML,15,15,{
      'width' : 190,
      'elementHandlers' : specialElementHandlers
    });
    doc.save('test.pdf');
  }

  getData(user_id){
    console.log(user_id,'user_id');
    let data = {id:user_id}
    this.apiService.getUserById(data)
    .subscribe(response=>{
      this.userDataById = response;

      console.log(this.userDataById);
      this.usersId =user_id;
      this.Name = this.userDataById[0].name;
      this.Age = this.userDataById[0].user_age;
      this.Email = this.userDataById[0].user_email;
      this.Details = this.userDataById[0].user_details;

    })
  }
  onUpdate(){
    if(this.profileForm.valid){
var name = this.profileForm.value.name;
var user_age = this.profileForm.value.user_age;
var user_email = this.profileForm.value.user_email;
var user_details = this.profileForm.value.user_details;
var id = this.usersId;
var data = {name:name, user_age:user_age, user_email:user_email, user_details:user_details, id:id}
this.apiService.updateUser(data)
.subscribe(response=>{
  this.profileForm.reset();
  this.getAllUsers();
  })
}
else{
  this.formSubmit = false;
  this.profileForm.markAllAsTouched();
}
  }
}