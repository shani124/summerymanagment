import { Component, EventEmitter, Input, OnChanges, OnInit, Output,SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { date } from 'src/app/DTO/dates';
import { IndexdbService } from 'src/app/services/indexeddatabase/indexdb.service';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css']
})
export class DatesComponent implements OnChanges, OnInit {
  previousid = '999999999999';
  adddisable= false;
  pointerevent= 'none';
  opacityofmaticon = '0.2';
  mydateform!: FormGroup;


  //usercheck
  usertype = false;

  //userid
  userid: any = localStorage.getItem('id');

  date = new FormControl();
  projectdate= '';
  alldates: date[] = [];
  admindates: date[] = [];

  @Input() projectid = '';
  @Output() dateid = new EventEmitter<string>();


  constructor(private dbservice: IndexdbService) {
    this.dbservice.getallprojectdates();
    this.dbservice._dates.subscribe(data => {

      if (localStorage.getItem('type') == 'employee') {
        this.usertype = false;
        const filteredprojectsforemployee = data.filter(p => p.eid == String(localStorage.getItem('id')) && p.pid == this.projectid);

        this.alldates = filteredprojectsforemployee;
      } else {
        this.usertype = true;
        this.alldates = data;
        const filteredemployeeeid = data.filter(p => p.eid == '1' && p.pid == this.projectid)
        this.alldates = filteredemployeeeid;

      }
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('type') == 'employee') {
      this.usertype = false;
    } else {
      this.usertype = true;
    }
  }

  ngOnChanges(): void {
    if (this.projectid == '') {
      
    } else {
      this.opacityofmaticon = '1';
      this.pointerevent = 'auto';
    }
    this.dateid.emit('');
    this.dbservice._dates.subscribe(data => {
      if (localStorage.getItem('type') == 'employee') {
        this.usertype = false;
        const filteredprojectsforemployee = data.filter(p => p.eid == String(localStorage.getItem('id')) && p.pid == this.projectid);

        this.alldates = filteredprojectsforemployee;
      } else {
        this.usertype = true;
        this.alldates = data;
        const filteredemployeeeid = data.filter(p => p.eid == '1' && p.pid == this.projectid)
        this.alldates = filteredemployeeeid;

      }
    });
  }

  Submit() {
    this.dbservice.addprojectdate(this.projectdate, this.projectid, this.usertype ? '1' : this.userid);
    this.projectdate = '';
  }

  setdateid(chosendateid: string) {
    this.dateid.emit(chosendateid);
    ////To highlight the selected 
    const prev = document.getElementById('date-' + this.previousid)
    if (!(prev === null)) { prev!.style.transform = 'scale(1)'; }
    const idhh = document.getElementById('date-' + chosendateid)
    idhh!.style.transform = 'scale(1.2)';
    this.previousid = chosendateid;

  }
  setdate(dats: any) {
    this.projectdate = dats.target.value;
  }
}
