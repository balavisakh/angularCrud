import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Login } from './../models/login';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  _baseURI: string;

  constructor(public http: HttpClient) {
    this._baseURI = "http://localhost/laravelCrud/public/";
   }
   getUsers(): Observable<User[]>{

    return this.http.post<User[]>(this._baseURI+'user-profile', {});
  }

  addUser(profileForm): Observable<User[]>{
    return this.http.post<User[]>(this._baseURI + 'create-user',profileForm);
  }

  deleteUser(userId): Observable<User[]>{
    return this.http.post<User[]>(this._baseURI + 'delete-user',userId);
  }

  userLogin(data):Observable<Login[]>{
    return this.http.post<Login[]>(this._baseURI + 'login',data);
  }
}
