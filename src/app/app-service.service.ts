import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Todo } from './Todo';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  readonly ROOT_URL;
  todo : Todo;
  _id : string;
  noAuthHeader ={ headers: new HttpHeaders({ 'NoAuth' : 'True'})};

  constructor(private http : HttpClient) {
    this.ROOT_URL = 'http://localhost:3000/user';
   }

   get(uri: string) {
     return this.http.get(`${this.ROOT_URL}/${uri}`);
   }

   post(uri: string, payload: Object) {
     return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
   }

   delete(uri: string, _id: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}/${_id}`);
  }

  setter(todo : Todo) {
    this.todo = todo;
  }

  getter() {
    return this.todo;
  }

  get_userTodo(userPayload : Object) {
    return this.http.post('http://localhost:3000/user'+"/todosGet", userPayload)
  }

}


