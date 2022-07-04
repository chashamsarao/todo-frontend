import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly ROOT_URL;

  selectedUser: User; 
  errors : string;
  ssoUserObj : any;

  noAuthHeader ={ headers: new HttpHeaders({ 'NoAuth' : 'True'})}
  ssoHeader = { headers: new HttpHeaders({ 'access_token' : sessionStorage.getItem('access_token')})}
  

  constructor( private http : HttpClient) { 
    this.ROOT_URL = 'http://localhost:3000/api';
   }

   postUser(user: User) {
            
    return this.http.post(this.ROOT_URL+'/register', user, this.noAuthHeader)
     
   }
   
   login(authCredentials) {
     return this.http.post(this.ROOT_URL+'/authenticate', authCredentials, this.noAuthHeader);
    
   }

  //
  loginwithSSO(ssoUserObj) {
    console.log("Sending request")
    return this.http.post(this.ROOT_URL + '/login-with-sso', ssoUserObj, this.noAuthHeader)
  }
  //
   
//
   loginWithGoogle() {
     return this.http.get(this.ROOT_URL + '/login-with-google');
   }
//

   getUserProfile(){
     return this.http.get(this.ROOT_URL + '/userProfile');
   }

   setToken(token : string){
    //  localStorage.setItem('token', token);
     sessionStorage.setItem('token', token)
   }

   deleteToken() {
     localStorage.removeItem('token');
     
     sessionStorage.clear();
   }

   getToken() {
     return sessionStorage.getItem('token');
   }

   //
   getTokenSession() {
     return sessionStorage.getItem('token')
   }

   //

  getUserPayload() {
      let token = this.getTokenSession();
      if(token) {
        let userPayload = atob(token.split('.')[1]);
        return JSON.parse(userPayload);
      }
      else 
        return null;
    }

    isLoggedIn() {
      let userPayload = this.getUserPayload();
      if (userPayload) {
        return userPayload.exp > Date.now() / 1000; 
      }
      else 
      return false
    }
 
}
