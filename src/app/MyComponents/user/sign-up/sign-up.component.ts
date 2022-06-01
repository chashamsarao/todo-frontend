import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import {  HttpClientModule, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  showSuccessMessage : boolean;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



  constructor( private userService : UserService) { }

  ngOnInit(): void {
  }

  onSubmit(signUpForm : NgForm) {

     this.userService.selectedUser = {

      username : signUpForm.value['title'],
      email : signUpForm.value['email'],
      password : signUpForm['password']

      
    }

    this.userService.postUser(signUpForm.value).subscribe(
      res => { this.showSuccessMessage = true;
      setTimeout(() => {this.showSuccessMessage = false}, 4000),
      this.resetForm(signUpForm)}
    )

  }

  resetForm(signUpForm : NgForm){
    this.userService.selectedUser = {
      username :'',
      email: '',
      password: ''
    }
    signUpForm.resetForm();
  }

}
