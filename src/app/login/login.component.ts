import { Router } from '@angular/router';
import { FormBuilder, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data:any;
  spinner = true;

  loginForm = this.fb.group({
    user_email: ['',Validators.required],
    user_password:['',Validators.required]
  });

  constructor(private userApi:UserService, private fb:FormBuilder, private router: Router ) { }

  ngOnInit() {
  }
  login(){
    if(this.loginForm.valid){
      this.spinner = false;
    this.userApi.userLogin(this.loginForm.value)
    .subscribe(response=>{
      this.spinner = true;
      this.data = response;
      if(this.data == "success"){
        this.router.navigate(['/user']);
        console.log("success");
      }else if(this.data == "failed"){
        alert("Your email or password is incorrect");
        console.log(['failure']);
      }
      console.log(this.data);
      console.log(this.loginForm.value);
    })
  }
}
}
