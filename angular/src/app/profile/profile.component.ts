import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private session: SessionService,
    private router:  Router,

  ) { }

  ngOnInit() {
  }

  logout() {
  this.session.logout();
  // this.router.navigate(['/login']);
}

}
