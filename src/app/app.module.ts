import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './MyComponents/todos/todos.component';
import { TodoItemComponent } from './MyComponents/todo-item/todo-item.component';
import { AddTodoComponent } from './MyComponents/add-todo/add-todo.component';
import { FormsModule } from '@angular/forms';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { UserComponent } from './MyComponents/user/user.component';
import { SignInComponent } from './MyComponents/user/sign-in/sign-in.component';
import { SignUpComponent } from './MyComponents/user/sign-up/sign-up.component';
import { UserProfileComponent } from './MyComponents/user-profile/user-profile.component';
import { UserService } from './shared/user.service';
import { AuthGuard } from './MyComponents/auth/auth.guard';
import { AuthInterceptor } from './MyComponents/auth/auth.interceptor';





@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoItemComponent,
    AddTodoComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    UserProfileComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
    ,AuthGuard, UserService],
   bootstrap: [AppComponent]
})
export class AppModule { }
  