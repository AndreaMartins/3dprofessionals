import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

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
