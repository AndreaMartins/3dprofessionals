import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { FileUploader } from "ng2-file-upload";

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

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
      private router:  Router,

    ) {  }

  ngOnInit() {

    let user = JSON.parse(localStorage.getItem("user"))
    this.session.getUser(user._id)
      .subscribe((user) => {
        this.user = user
      }); /* Ajax call */

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



  saveProfile() {
    // console.log("inside component saveProfile")
    this.session.edit(this.user)
      .subscribe((userEdit) => {
        console.log("subscribe")
        // this.user = user
        // this.user = userEdit
        this.router.navigate(['/profile']);
      });




  }


}
