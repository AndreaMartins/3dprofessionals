import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { FileUploader } from "ng2-file-upload";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  id: number;
  private sub: any;

  // users: Object = {}
  // user: any;
  // error: string;
  // newProject: Object;


  constructor(
    private session: SessionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.session.getProject(params['id'])
                .subscribe(result => {
                  if (result !== "") {

                      console.log("test",result);

                  } else {

                      console.log('ho',result);


                  }
              });

    });

    // this.session.getList()
    //   .subscribe((users) => {
    //     console.log("project", users)
    //     this.users = users;
    //   });
}
}
