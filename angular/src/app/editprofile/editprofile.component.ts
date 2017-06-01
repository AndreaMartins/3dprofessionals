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

  });



    constructor(
      private session: SessionService,
      private router:  Router,
      private route: ActivatedRoute
    ) {  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.session.getUser(this.userId)
      .subscribe((user) => {
        this.user = user
      });
    });

  }

  saveProfile() {
    this.session.edit(this.user)
      .subscribe(()=>{
        this.router.navigate(['/profile']);
      })
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
