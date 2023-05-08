import { Component, Input, OnChanges,SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { summery } from 'src/app/DTO/summery';
import { IndexdbService } from 'src/app/services/indexeddatabase/indexdb.service';
@Component({
  selector: 'app-adminemployesummery',
  templateUrl: './adminemployesummery.component.html',
  styleUrls: ['./adminemployesummery.component.css']
})
export class AdminemployesummeryComponent implements OnChanges {
  date = new FormControl();
  pointerevent = 'none';
  opacityofmaticon= '0.2';
  heading= '';
  description = '';
  ischecked = 'false';
  allsummery: summery[] = [];
  @Input() projectid = '';
  @Input() dateid = '';
  @Input() employeeid = '';
  constructor(private dbservice: IndexdbService) {
    this.dbservice._summery.subscribe(data => {
      this.allsummery = data;
    });
    this.dbservice.getallprojectsummery();

  }
  ngOnChanges(): void {

    if (this.projectid == '' || this.dateid == '' || this.employeeid == '') {
      this.allsummery = [];
      this.opacityofmaticon = '0.2';
      this.pointerevent = 'none';
    } else {
      this.opacityofmaticon = '1';
      this.pointerevent = 'auto';
    }


    this.dbservice._summery.subscribe(data => {

      this.allsummery = data.filter(p => p.did == this.dateid && p.eid == this.employeeid);
    });
  }

  setischecked(event: any, id: string, heading: string, description: string) {

    const updatedRecord: summery = {
      id: id,
      heading: heading,
      description: description,
      ischecked: event.target.checked,
      did: this.dateid,
      eid: this.employeeid

    };
    this.dbservice.updateprojectsummery(id, updatedRecord);

  }
  loginclick() {
    this.dbservice.addprojectsummery(this.heading, this.description, this.dateid, false, this.employeeid);
    //reseting form values
    this.heading = '';
    this.description = '';
  }


}
