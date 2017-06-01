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
    changeStatus: ""
  };

  iscolapse:Boolean = true;
  project: Object = {};
  projectId: number;
  client: Object = {};
  professional: Object = {};
  user: Object = {};
  changeDescription: string;
  changeStatus: string;
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
    this.project = result;
    this.client = result.client;
    this.professional = result.professional;
    });
  }

deleteProject(){
          this.session.removeProject(this.project["_id"])
          .subscribe(()=>{
              this.router.navigate(['/dashboard']);
          });
}
  submit() {
    this.uploader.uploadAll();
    window.location.reload()
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.session.logout();
  }

  acceptProject(){
    this.newProject.changeStatus = "FINISHED";
    this.session.acceptProject(this.projectId, this.newProject)
    .subscribe(result => {
      this.project = result
    });
  }

  askChanges(){
    this.newProject.changeStatus = "SOME CHANGES PLEASE";
    this.session.editProject(this.projectId, this.newProject)
    .subscribe(result => {
      this.project = result
    });
  }

  }
