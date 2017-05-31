import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader } from "ng2-file-upload";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {

  newProject = {
    changeDescription: '',
  };

  iscolapse:Boolean = true;
  project: Object = {};
  projectId: number;
  client: Object = {};
  professional: Object = {};
  user: Object = {};
  changeDescription: string;
  uploader: FileUploader = new FileUploader({
  });


  constructor(
    private session: SessionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
      this.getProject();
      this.uploader.options.url = `http://localhost:3000/project/${this.projectId}`
      let user = JSON.parse(localStorage.getItem("user"))
      this.session.getUser(user._id)
      .subscribe((user) => {
      this.user = user
      });
    });
  }

  getProject() {
    this.session.getProject(this.projectId)
    .subscribe(result => {
    console.log("project component ", result);
    this.project = result;
    this.client = result.client;
    this.professional = result.professional;
    console.log("this project", this.project)
    });
  }

  submit() {
    console.log(this.uploader)
    this.uploader.uploadAll();
    window.location.reload()
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.session.logout();
  }

  askChanges(){
    this.session.editProject(this.projectId, this.newProject)
    .subscribe(result => {
      this.project = result
    });
  }

  }
    // first create a method to post to the server
    // when posting you want to pass the id of the project and the object newProject
    // on the backend you create a post that picksup object and id, create a new object that has image path set to
    // "", and the value of newProject
    // Project.FindByIdAndUpdate (with the id that you pass from angular, and pass the object)
    // send back the adjusted project
