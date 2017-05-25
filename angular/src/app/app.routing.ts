import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

import { ProjectComponent } from './project/project.component';

import { EditprofileComponent } from './editprofile/editprofile.component';

import { SessionService } from './services/session.service';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [SessionService] },
  { path: 'profile', component: ProfileComponent, canActivate: [SessionService] },

  { path: 'project/:id', component: ProjectComponent, canActivate: [SessionService] },

  { path: 'editprofile', component: EditprofileComponent, canActivate: [SessionService] }


 
];
