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
  project: Object = {};
  projectId: number;
  client: Object = {};
  professional: Object = {};

  constructor(
    private session: SessionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = params['id'];

      this.getProject();
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
}
