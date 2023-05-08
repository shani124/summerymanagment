import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AppRoutingModule } from '../app-routing.module';
import { ProjectsComponent } from './childcomponents/projects/projects.component';
import { DatesComponent } from './childcomponents/dates/dates.component';
import { SummerylistComponent } from './childcomponents/summerylist/summerylist.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { TopbarComponent } from './childcomponents/topbar/topbar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    HomeComponent,
    ProjectsComponent,
    DatesComponent,
    SummerylistComponent,
    TopbarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
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
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    MatSlideToggleModule
    
    
    
  ]
})
export class HomeModule { }
