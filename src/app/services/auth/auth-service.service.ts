import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login_details, token_details } from '../../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static isLoggedIn: any;

  constructor(private http: HttpClient) { }
  isLoggedIn = false;

  loginUser(logins: login_details){
    return this.http.post<{message?:string, token?:string, error?:string}>('http://localhost:3002/auth/login', logins)
  }

  checkDetails(token:string){
    return this.http.get<token_details>('http://localhost:3002/auth/check-details', {
      headers:{
        'token': token
      }
    })
  }

  createAccount(user: {first_name:string,last_name:string, username: string, email:string,phone_number:string, password_hash:string}){
    return this.http.post<{message?:string, error?:string}>('http://localhost:3002/user/register', user)
  }
}
