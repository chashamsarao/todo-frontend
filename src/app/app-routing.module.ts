import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './MyComponents/todos/todos.component';
import { LoginSignUpComponent } from './MyComponents/login-sign-up/login-sign-up.component'

const routes: Routes = [
  { path: 'login-sign-up', component: LoginSignUpComponent },
  { path: 'todos', component: TodosComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
