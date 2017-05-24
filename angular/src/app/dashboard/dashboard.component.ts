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
    considerations:'',
  };
  users: Object = {}
  user: any;
  error: string;
  constructor(
    private session: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.session.getList()
      .subscribe((users) => {
        console.log(users)
        this.users = users;
      });

  }

  createProject(){
    this.session.createProject(this.newProject)
      .subscribe(result => {
          if (result === true) {
              // login successful
              console.log('result ok', result);
              this.router.navigate(['/dashboard']);
          } else {
              console.log('result ko', result);
              // login failed
              // this.error = 'Username or password is incorrect';
          }
      });


  }

}
