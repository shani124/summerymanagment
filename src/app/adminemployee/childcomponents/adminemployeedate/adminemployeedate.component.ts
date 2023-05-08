import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { date } from 'src/app/DTO/dates';
import { IndexdbService } from 'src/app/services/indexeddatabase/indexdb.service';

@Component({
  selector: 'app-adminemployeedate',
  templateUrl: './adminemployeedate.component.html',
  styleUrls: ['./adminemployeedate.component.css']
})
export class AdminemployeedateComponent implements OnChanges {
  previousid = '999999999999';
  adddisable= false;
  pointerevent = 'none';
  opacityofmaticon= '0.2';


  date = new FormControl();
  projectdate= '';
  alldates: date[] = [];
  employeedates: date[] = [];


  @Input() projectid = '';
  @Input() employeeid = '';
  @Output() dateid = new EventEmitter<string>();



  constructor(private dbservice: IndexdbService) {
    this.dbservice._dates.subscribe(data => {

      // data.filter(p => p.pid.includes(this.projectid));
      this.alldates = data;
      const filteredemployeeeid = data.filter(p => p.eid == this.employeeid && p.pid == this.projectid)
      this.employeedates = filteredemployeeeid;

    });
    this.dbservice.getallprojectdates();

  }
  ngOnChanges(): void {
    if (this.projectid == '' || this.employeeid == '') {
      this.alldates = [];

      this.opacityofmaticon = '0.2';
      this.pointerevent = 'none';
      
    } else {
      this.opacityofmaticon = '1';
      this.pointerevent = 'auto';
    }
    this.dateid.emit('');

    this.dbservice._dates.subscribe(data => {

      this.alldates = data.filter(p => p.pid == this.projectid && p.eid == this.employeeid);
      this.employeedates = data.filter(p => p.pid == this.projectid && p.eid == this.employeeid);
    });
  }

  loginclick() {
    this.dbservice.addprojectdate(this.projectdate, this.projectid, this.employeeid);
    this.projectdate = '';
  }
  setdateid(id: string) {
    this.dateid.emit(id);

    ////To highlight the selected 
    const prev = document.getElementById('date-' + this.previousid)
    if (!(prev === null)) { prev!.style.transform = 'scale(1)'; }
    const idhh = document.getElementById('date-' + id)
    idhh!.style.transform = 'scale(1.2)';
    this.previousid = id;

  }
  setdate(dats: any) {
    this.projectdate = dats.target.value;
  }
}
