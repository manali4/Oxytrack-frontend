import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {HomeComponent} from './home/home.component';
import { AuthGuard } from './helpers/auth.guard';
import { AddCylinderComponent } from './add-cylinder/add-cylinder.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { PostRequirementComponent } from './post-requirement/post-requirement.component';
import { ViewRequirementsComponent } from './view-requirements/view-requirements.component';
import { FulfillRequirementComponent } from './fulfill-requirement/fulfill-requirement.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'add/cylinder', component: AddCylinderComponent, canActivate: [AuthGuard]},
  {path: 'add/patient', component: RegisterPatientComponent, canActivate: [AuthGuard]},
  {path: 'add/requirement', component: PostRequirementComponent, canActivate: [AuthGuard]},
  {path: 'view/requirement', component: ViewRequirementsComponent, canActivate: [AuthGuard]},
  {path: 'view/requirement/:id', component: FulfillRequirementComponent, canActivate: [AuthGuard]},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent}
  // otherwise redirect to home
  // {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
