import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AppRoutingModule } from "../../app-routing.module"
// import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
// import { GoogleLoginProvider } from "@abacritt/angularx-social-login";

import { GoogleApiService, UserInfo } from 'src/app/google-api.service';


@Component({
  selector: 'app-login-sign-up',
  templateUrl: './login-sign-up.component.html',
  styleUrls: ['./login-sign-up.component.css']
})
export class LoginSignUpComponent implements OnInit {
  
  // user : SocialUser;
  // loggedIn: boolean;

    userInfo?: UserInfo

  constructor( private readonly googleApi: GoogleApiService) {

    googleApi.userProfileSubject.subscribe( info => {
      this.userInfo = info
    })


   }

   isLoggedIn(): boolean {
     return this.googleApi.isLoggedIn()
   }

   logout() {
     this.googleApi.signOut()
   }



  //   const googleLoginOptions = {
  //     scope: 'profile email'
  //   };
  //   let config = [
  //     {
  //       id: GoogleLoginProvider.PROVIDER_ID,
  //       provider: new GoogleLoginProvider("Google-OAuth-Client-Id", googleLoginOptions)
  //     },
  //   ];
   
  // }

  


  
  ngOnInit(): void {
    
    // console.log("yo............")
    // this.authService.authState.subscribe((user)=>{
    //   console.log("yo 2 ")
    //   this.user = user;
    //   this.loggedIn = (user != null);
    //   console.log(this.user);
    // })
  // }

  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
  //     .then(() => this.router.navigate(['todos']));
  // }

  // signOut(): void {
  //   this.authService.signOut();
  // }

  }
}
