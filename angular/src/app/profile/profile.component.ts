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

editProfile() {
        this.router.navigate(['/editprofile']);
  	}


}
