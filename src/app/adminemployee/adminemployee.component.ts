import { Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adminemployee',
  templateUrl: './adminemployee.component.html',
  styleUrls: ['./adminemployee.component.css']
})
export class AdminemployeeComponent{
  projectid = '';
  dateid = '';
  employeeid = '';
  constructor(private router: Router) { }
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
  handleemployeeoutput(id: string) {
    this.employeeid = id;
  }
}
