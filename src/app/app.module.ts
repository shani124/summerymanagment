import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './rootcomponents/login/login.component';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminemployeeModule } from './adminemployee/adminemployee.module';
import { SignupComponent } from './rootcomponents/signup/signup.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { TooltipModule } from 'ngx-bootstrap/tooltip'
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';

const dbConfig:DBConfig = {
  name: 'summerymanagment',
  version: 1,
  objectStoresMeta: [{
    store: 'users',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'username', keypath: 'username', options: { unique: true } },
      { name: 'email', keypath: 'email', options: { unique: true } },
      { name: 'password', keypath: 'password', options: { unique: false } },
      { name: 'type', keypath: 'type', options: { unique: false } },   
      { name: 'isactive', keypath: 'isactive', options: { unique: false } },    
    ]
  },
  {
    store: 'projects',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'projectname', keypath: 'projectname', options: { unique: true } },
      { name: 'eid', keypath: 'eid', options: { unique: false } },  
      { name: 'isactive', keypath: 'isactive', options: { unique: false } },      
      
    ]
  },
  {
    store: 'dates',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'date', keypath: 'date', options: { unique: false } },
      { name: 'pid', keypath: 'pid', options: { unique: false } },     
      { name: 'eid', keypath: 'eid', options: { unique: false } },       
    ]
  },
  
  {
    store: 'summerylist',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'date', keypath: 'date', options: { unique: false } },
      { name: 'heading', keypath: 'heading', options: { unique: false } },
      { name: 'description', keypath: 'description', options: { unique: false } },
      { name: 'ischecked', keypath: 'ischecked', options: { unique: false } },
      { name: 'did', keypath: 'did', options: { unique: false } },
      { name: 'eid', keypath: 'eid', options: { unique: false } },      
    ]
  },

]
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    CommonModule,
    FormsModule,
    AdminemployeeModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    NoopAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [BsModalRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
