
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


const oAuthConifig: AuthConfig = {
  issuer : 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri : "http://localhost:4200/login-sign-up",
  clientId: '1049173868079-ts3s68vka4h3abqjguj6uac43uud9vim.apps.googleusercontent.com',
  scope: 'openid profile email'

}

export interface UserInfo {
  info: {
    sub: string,
    email: string,
    name: string,
    picture: string
  }
}


@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  userProfileSubject = new Subject<UserInfo>()
  
  constructor(private readonly oAuthService: OAuthService) { 
    oAuthService.configure(oAuthConifig)
    oAuthService.logoutUrl = 'https://www.google.com/accounts/Logout'
    oAuthService.loadDiscoveryDocument().then(() => {
        oAuthService.tryLoginImplicitFlow().then( () => {
          if(!oAuthService.hasValidAccessToken()){
            oAuthService.initLoginFlow()
          } else {
            oAuthService.loadUserProfile().then( (userProfile) => {
              this.userProfileSubject.next(userProfile as UserInfo)
              
            })
          }
        })
    })
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken()
  }

    signOut() {
      this.oAuthService.logOut()
    }

}




