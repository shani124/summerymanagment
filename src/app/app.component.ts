import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { IndexdbService } from './services/indexeddatabase/indexdb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dbname = 'summerymanagment';
  usertablename='users';
   
constructor(private router:Router,private dbService: NgxIndexedDBService,private localservicedb:IndexdbService){
    this.localservicedb.getallusers();
}

ngOnInit(): void {
  if(localStorage.getItem("token")){    
       this.router.navigate(['/home']);   
   }else{
    this.router.navigate(['/login']);
   }
}

}
