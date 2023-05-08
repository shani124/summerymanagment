import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/DTO/user';
import { IndexdbService } from 'src/app/services/indexeddatabase/indexdb.service';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent {
  previousid = '999999999999';
  employees: User[] = []
  @Output() employeeid = new EventEmitter<string>();

  constructor(private serviceindex: IndexdbService) {
    this.serviceindex._employees.subscribe(data => {
      this.employees = data;
    });
    this.serviceindex.getallemployees();
  }
 

  setemployeeid(id: string) {
    this.employeeid.emit(id);
    ////To highlight the selected 
    const prev = document.getElementById('employee-' + this.previousid)
    if (!(prev === null)) { prev!.style.transform = 'scale(1)'; }
    const idhh = document.getElementById('employee-' + id)
    idhh!.style.transform = 'scale(1.2)';
    this.previousid = id;
  }
}
