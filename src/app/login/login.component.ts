import { Router } from '@angular/router';
import { FormBuilder} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    user_email: [''],
    user_password:['']
  });

  constructor(private userApi:UserService, private fb:FormBuilder, private router: Router ) { }

  ngOnInit() {
  }
  login(){
    if(this.loginForm.valid){
    this.userApi.userLogin(this.loginForm.value)
    .subscribe(response=>{
      console.log(response);
      if(this.loginForm.value == true){
        this.router.navigate(['/user']);
        }else{
          this.router.navigate(['']);

        }
    })
  }
}
}
