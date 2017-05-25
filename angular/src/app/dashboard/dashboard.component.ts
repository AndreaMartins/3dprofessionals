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
    client:''
  };

professionals: Object = {};
client: Object ={};

  constructor(
    private session: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
// this.session.getClient()
// .subscribe(client=>{
//   this.clients= client
//   console.log("test",this.clients)
// });

   this.session.getProfessional()
   .subscribe(prof => {
      console.log(prof)
      this.professionals = prof
         console.log("test", this.professionals)
   });

  }

  createProject(){
    var client = JSON.parse(localStorage.getItem("user"))
    this.newProject.client = client._id
    this.session.createProject(this.newProject)
      .subscribe(result => {
          console.log("result", result)
          if (result !== "") {
              // login successful
              console.log('result ok', result._id);
              this.router.navigate(['/project', result._id]);
          } else {
              console.log('result ko', result);
          }
      });
  }

  logout() {
  this.session.logout();
  // this.router.navigate(['/login']);
}

}
