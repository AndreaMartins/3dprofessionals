import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user: Object = {};
iscolapse:Boolean = true;

  constructor(
    private session: SessionService,
    private router:  Router,

  ) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem("user"))
    this.session.getUser(user._id)
    .subscribe((user) => {
        this.user = user
      });


  }

  editProfile(userId) {
          this.router.navigate(['/editprofile', this.user["_id"]]);
    	}

  deleteProfile(userId) {
    console.log("hi from the delete profile")
            this.session.remove(this.user["_id"])
            .subscribe(()=>{
                this.router.navigate(['/signup']);
            });
        	}

  logout() {
      this.session.logout();
    }

    goToDashboard() {
      this.router.navigate(['/dashboard']);
    }

}
