import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { project } from 'src/app/DTO/project';
import { IndexdbService } from 'src/app/services/indexeddatabase/indexdb.service';
@Component({
  selector: 'app-adminemployeproject',
  templateUrl: './adminemployeproject.component.html',
  styleUrls: ['./adminemployeproject.component.css']
})
export class AdminemployeprojectComponent implements OnChanges {

  ///cssvariables
  previousid = '999999999999';

  //add project button css
  pointerevent= 'none';
  opacityofmaticon = '0.2';

  //project assign button css
  pointereventassign= 'none';
  opacityofmaticonassign= '0.2';

  ///setdata to send or get variables
  projectname = '';
  assignproject= '';
  allprojects: project[] = [];
  employeeprojects: project[] = [];
  dropdownprojects: project[] = [];

  //data flow between components
  @Output() projectid = new EventEmitter<string>();
  @Input() employeeid = '';




  constructor(private dbservice: IndexdbService) {
    this.dbservice._project.subscribe(data => {
      this.allprojects = data;
      const filteredemployeeeid = data.filter(p => p.eid.includes(this.employeeid) && p.isactive == true)
      this.employeeprojects = filteredemployeeeid;
      this.dropdownprojects = data.filter(p => !p.eid.includes(this.employeeid) && p.isactive == true)

    });
    this.dbservice.getallproject();

  }



  ngOnChanges(): void {
    //check to disable Project add button
    if (this.employeeid == '') {
      this.allprojects = [];
      this.opacityofmaticon = '0.2';
      this.pointerevent = 'none';
    } else {
      this.opacityofmaticon = '1';
      this.pointerevent = 'auto';
    }
    this.projectid.emit('');
    this.dbservice._project.subscribe(data => {

      this.employeeprojects = data.filter(p => p.eid.includes(String(this.employeeid)) && p.isactive == true);
      this.dropdownprojects = data.filter(p => !p.eid.includes(String(this.employeeid)) && p.isactive == true);
    });

  }

  //Assign project call to service
  loginclick() {
    if (this.assignproject == 'default') {
      return
    } else {
      this.employeeprojects = this.allprojects.filter(p => p.eid.includes(String(this.employeeid)));
      const filtering = this.allprojects.find(p => p.projectname == this.assignproject);
      filtering?.eid.push(String(this.employeeid));
      const updatedparams: project = {
        id: filtering!.id,
        projectname: filtering!.projectname,
        eid: filtering!.eid,
        isactive: true
      };
      this.dbservice.addprojectforemployees(updatedparams);
    }
  }


  setprojectid(id: string) {
    this.projectid.emit(id);
    ////To highlight the selected 
    const prev = document.getElementById('project-' + this.previousid)
    if (!(prev === null)) { prev!.style.transform = 'scale(1)'; }
    const idhh = document.getElementById('project-' + id)
    idhh!.style.transform = 'scale(1.2)';
    this.previousid = id;
  }

  checkhighlight(id: any) {
    let returnvalue: boolean;
    this.projectid.subscribe((ids: string) => {
      if (id === ids) {
        console.log('Project IDs match!');
        returnvalue = true;
      } else {
        console.log('Project IDs do not match.');
        returnvalue = false;
      }
    });


  }


}
