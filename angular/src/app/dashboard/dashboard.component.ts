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

  iscolapse:Boolean = true;

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

  user: Object = {};

  uploader: FileUploader = new FileUploader({
    url: `https://3dprofessionals.herokuapp.com/edit`,

    authToken: `JWT ${this.session.token}`
  });

  newUser = {
    _id: '',
    name: '',
    surname: '',
    email: '',
    role: '',
    password: ''
  };

  feedback: string;

  isAuth: boolean;


  constructor(
    private session: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem("user"))
    this.session.getUser(user._id)
    .subscribe((user) => {
      this.user = user
    }); /* Ajax call */


   this.session.getProfessional()
   .subscribe(prof => {
      console.log(prof)
      this.professionals = prof
         console.log("test", this.professionals)
   });



    this.newUser._id = user._id
    this.newUser.name = user.name
    this.newUser.surname = user.surname
    this.newUser.email = user.email
    this.newUser.password = user.password
    this.newUser.role = user.role


    this.uploader.onSuccessItem = (item, user) => {
      localStorage.removeItem("user")
      localStorage.setItem("user", user)
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };

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
}

goToProfile() {
  this.router.navigate(['/profile']);
}

}
