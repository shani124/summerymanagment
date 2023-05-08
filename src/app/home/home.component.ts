import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //usercheck
  usertype= false;
  projectid = '';
  dateid = '';
  constructor(private router: Router) {

  }
  ngOnInit(): void {
    
    if (localStorage.getItem('type') == 'employee') {        
      this.usertype = true;
    } else {
      this.usertype = false
    }

  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  handleprojectidoutput(id: string) {
    this.projectid = id;
  }
  handledateidoutput(id: string) {
    this.dateid = id;
  }
}
