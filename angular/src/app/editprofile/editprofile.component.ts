import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader } from "ng2-file-upload";

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  user: Object = {};
  iscolapse:Boolean = true;

  userId: number;
  client: Object = {};
  professional: Object = {};

  uploader: FileUploader = new FileUploader({
    url: `http://localhost:3000/user/photo` ,

    // authToken: `JWT ${this.session.token}`
  });

  // newUser = {
  //   _id: '',
  //   name: '',
  //   surname: '',
  //   email: '',
  //   role: '',
  //   password: '',
  //   profilePic: ''
  // };
  //
  // feedback: string;
  //
  // isAuth: boolean;

    constructor(
      private session: SessionService,
      private router:  Router,
      private route: ActivatedRoute
    ) {  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.userId = params['id'];
      // let user = JSON.parse(localStorage.getItem("user"))
      this.session.getUser(this.userId)
      .subscribe((user) => {
        this.user = user
      });
    });

  }

  // getUser() {
  //   this.session.getUser(this.userId)
  //   .subscribe(result => {
  //     console.log("user component ", result);
  //     this.user = result;
  //     this.client = result.client;
  //     this.professional = result.professional;
  //
  //     console.log("this user", this.user)
  //   });
  // }

  saveProfile() {
    console.log(this.user)
    this.session.edit(this.user)
      .subscribe(()=>{
        this.router.navigate(['/profile']);
      })
    // console.log("inside component saveProfile")
    // this.uploader.onBuildItemForm = (item, form) =>{
    //   form.append("name", this.user['name'])
    //   form.append("surname",this.user['surname'])
    //   form.append("email",this.user['email'])
    //   form.append("password",this.user['password'])
    //   form.append("projects",this.user['projects'])
    //   form.append("role",this.user['role'])
    // }
    //     this.uploader.uploadAll();
    //     this.router.navigate(['/profile']);
  }

savePhoto() {
  this.uploader.onBuildItemForm = (item, form) =>{
    form.append("id", this.user['_id'])
  }
      this.uploader.uploadAll();
      window.location.reload()
      this.router.navigate(['/profile']);
}

logout() {
  this.session.logout();
}

goToProfile() {
this.router.navigate(['/profile']);
}

goToDashboard() {
  this.router.navigate(['/dashboard']);
}

}
