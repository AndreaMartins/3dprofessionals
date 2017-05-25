import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { FileUploader } from "ng2-file-upload";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  newProject = {
    name: '',
    link: '',
    professional: '',
    description: '',
    considerations:''
  };

  constructor(
    private session: SessionService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  createProject(){
    this.session.createProject(this.newProject)
      .subscribe(result => {
          if (result !== "") {
              // login successful
              console.log('result ok', result._id);
              this.router.navigate(['/project', result._id]);
          } else {
              console.log('result ko', result);
                // login failed
              // this.error = 'Username or password is incorrect';
          }
      });
  }

  logout() {
  this.session.logout();
  // this.router.navigate(['/login']);
}

}
