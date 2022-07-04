import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
userDetails: JSON; 


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        // this.userDetails.username = res['user'].username,
        // this.userDetails.email = res['user'].email,
        this.userDetails = res['user']
      }
    )
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/sign-in'])
  }

}
