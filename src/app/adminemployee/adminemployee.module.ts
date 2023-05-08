import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminemployeeRoutingModule } from './adminemployee-routing.module';
import { AdminemployeeComponent } from './adminemployee.component';
import { AdminemployeedateComponent } from './childcomponents/adminemployeedate/adminemployeedate.component';
import { AdminemployeetopbarComponent } from './childcomponents/adminemployeetopbar/adminemployeetopbar.component';
import { AdminemployeprojectComponent } from './childcomponents/adminemployeproject/adminemployeproject.component';
import { AdminemployesummeryComponent } from './childcomponents/adminemployesummery/adminemployesummery.component';
import { AppRoutingModule } from '../app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { EmployeelistComponent } from './childcomponents/employeelist/employeelist.component';


@NgModule({
  declarations: [
    AdminemployeeComponent,
    AdminemployeedateComponent,
    AdminemployeetopbarComponent,
    AdminemployeprojectComponent,
    AdminemployesummeryComponent,
    EmployeelistComponent
    ],
  imports: [
    CommonModule,
    AdminemployeeRoutingModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatIconModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ]
})
export class AdminemployeeModule { }
