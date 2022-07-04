import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from 'src/app/sso.config';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  

  constructor( private userService : UserService, private router: Router, private oauthService : OAuthService ) {
    this.configureSignOn();
   }

  // model = {
  //   email : '',
  //   password: ''
  // }

  

  ngOnInit(): void {
  }

  onSubmit(signInForm : NgForm) {
    // this.model = {
    //   email : signInForm.value['email'],
    //   password : signInForm.value['password']
    // }

    this.userService.login(signInForm.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/todos');
        
      }
    )
    

  }

  configureSignOn() {
    // console.log("On click method triggered");
    // this.oauthService.configure(authCodeFlowConfig)
    // this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    // this.oauthService.loadDiscoveryDocumentAndTryLogin();
    // this.access_token = this.oauthService.getAccessToken()
    
    // sessionStorage.setItem('token', this.access_token)

    this.oauthService.redirectUri = 'http://localhost:4200/sign-in';
    this.oauthService.clientId = '0oa5azoxrxWUP7hYK5d7';
    this.oauthService.scope = 'openid profile email';
    this.oauthService.issuer = 'https://dev-27750228.okta.com/oauth2/default';
   
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.dummyClientSecret = 'test'

    // Load Discovery Document and then try to login the user


    this.oauthService.loadDiscoveryDocumentAndTryLogin();

    // sessionStorage.setItem('token', this.oauthService.getAccessToken())
  
  }

  ssoLogin() {
    this.oauthService.initImplicitFlow(); 
    
  }

  // ssoLogout(){
  //   this.oauthService.logOut();
  // }



  get claim() {
    const claims = this.oauthService.getIdentityClaims();
    // console.log(claims)
    if (!claims) {
      return null;
    }

    else 
      this.setToken();
      return claims['name'];
  }

  
  setToken() {
    let ssoUserObj = {
      "username" : this.oauthService.getIdentityClaims()['name'],
      "email" : this.oauthService.getIdentityClaims()['email'],
      "access_token" : this.oauthService.getAccessToken()
    }
    
    this.userService.loginwithSSO(ssoUserObj).subscribe((res) => { sessionStorage.setItem('token', res["token"]),
    this.router.navigateByUrl('/todos'); })
  }
 

}
