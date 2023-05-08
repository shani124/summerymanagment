import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './rootcomponents/login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminemployeeComponent } from './adminemployee/adminemployee.component';
import { SignupComponent } from './rootcomponents/signup/signup.component';

const routes: Routes = [
 
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'home',component:HomeComponent},
  {path:'employeemanage',component:AdminemployeeComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
