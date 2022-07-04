import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './MyComponents/todos/todos.component';
import { SignInComponent } from './MyComponents/user/sign-in/sign-in.component';
import { UserComponent } from './MyComponents/user/user.component';
import { SignUpComponent } from './MyComponents/user/sign-up/sign-up.component';
import { UserProfileComponent } from './MyComponents/user-profile/user-profile.component';
import { AuthGuard } from './MyComponents/auth/auth.guard';


const routes: Routes = [
  { path: 'user', component: UserComponent},

  { path: 'sign-in', component: SignInComponent},

  { path: 'sign-up', component: SignUpComponent},
  
  { path: 'todos', component: TodosComponent, canActivate:[AuthGuard] },
  { path: 'user-profile', component: UserProfileComponent, canActivate:[AuthGuard] },
  { path: '**', redirectTo:'app-root'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
