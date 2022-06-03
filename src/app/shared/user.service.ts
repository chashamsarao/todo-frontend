import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly ROOT_URL;

  selectedUser: User; 
  errors : string;

  noAuthHeader ={ headers: new HttpHeaders({ 'NoAuth' : 'True'})}

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
   loginWithGoogle() {
     return this.http.get(this.ROOT_URL + '/login-with-google');
   }
//

   getUserProfile(){
     return this.http.get(this.ROOT_URL + '/userProfile');
   }

   setToken(token : string){
     localStorage.setItem('token', token);
     sessionStorage.setItem('token', token)
   }

   deleteToken() {
     localStorage.removeItem('token');
   }

   getToken() {
     return localStorage.getItem('token');
   }

   //
   getTokenSession() {
     return sessionStorage.getItem('token')
   }

   //

  getUserPayload() {
      let token = this.getToken();
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
