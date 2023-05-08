import { Component,Input, OnChanges, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { summery } from 'src/app/DTO/summery';
import { IndexdbService } from 'src/app/services/indexeddatabase/indexdb.service';


@Component({
  selector: 'app-summerylist',
  templateUrl: './summerylist.component.html',
  styleUrls: ['./summerylist.component.css']
})
export class SummerylistComponent implements OnChanges, OnInit {
  date = new FormControl();

  pointerevent= 'none';
  opacityofmaticon= '0.2';

  //usercheck
  usertype= false;

  //userid
  userid: any = localStorage.getItem('id');

  heading= '';
  description= '';
  ischecked= 'false';
  allsummery: summery[] = [];
  @Input() projectid = '';
  @Input() dateid = '';
  constructor(private dbservice: IndexdbService) {
    this.dbservice._summery.subscribe(data => {


      if (localStorage.getItem('type') == 'employee') {
        this.usertype = false;
        const filteredprojectsforemployee = data.filter(p => p.eid == String(localStorage.getItem('id')) && p.did == this.dateid);

        this.allsummery = filteredprojectsforemployee;
      } else {
        this.usertype = true;
        this.allsummery = data;
        const filteredemployeeeid = data.filter(p => p.eid == '1' && p.did == this.dateid)
        this.allsummery = filteredemployeeeid;

      }



    });
    this.dbservice.getallprojectsummery();

  }
  ngOnInit(): void {
    if (localStorage.getItem('type') == 'employee') {
      this.usertype = false;
    } else {
      this.usertype = true;
    }
  }
  ngOnChanges(): void {

    if (this.projectid == '' || this.dateid == '') {
      this.allsummery = [];
      this.opacityofmaticon = '0.2';
      this.pointerevent = 'none';
    } else {
      this.opacityofmaticon = '1';
      this.pointerevent = 'auto';
    }


    this.dbservice._summery.subscribe(data => {

      if (localStorage.getItem('type') == 'employee') {
        this.usertype = false;
        const filteredprojectsforemployee = data.filter(p => p.eid == String(localStorage.getItem('id')) && p.did == this.dateid);

        this.allsummery = filteredprojectsforemployee;
      } else {
        this.usertype = true;
        this.allsummery = data;
        const filteredemployeeeid = data.filter(p => p.eid == '1' && p.did == this.dateid)
        this.allsummery = filteredemployeeeid;

      }
    });
  }

  setischecked(event: any, id: string, heading: string, description: string) {
    const updatedRecord: summery = {
      id: id,
      heading: heading,
      description: description,
      ischecked: event.target.checked,
      did: this.dateid,
      eid: '1'

    };
    this.dbservice.updateprojectsummery(id, updatedRecord);

  }
  loginclick() {
    this.dbservice.addprojectsummery(this.heading, this.description, this.dateid, false, this.usertype ? '1' : this.userid);
    //reseting form values
    this.heading = '';
    this.description = '';
  }


}
