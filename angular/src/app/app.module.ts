import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { SessionService } from './services/session.service';
import{routes} from './app.routing';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectComponent } from './project/project.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { FileSelectDirective } from "ng2-file-upload";
import {CollapseModule} from 'ngx-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent,
    NavbarComponent,
    EditprofileComponent,
    ProjectComponent,
    FileSelectDirective
  ],

  imports: [
    BrowserModule,
    CollapseModule.forRoot(),
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
