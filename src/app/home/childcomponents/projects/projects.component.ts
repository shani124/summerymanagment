import { Component, EventEmitter,Output,TemplateRef } from '@angular/core';
import { project } from 'src/app/DTO/project';
import { IndexdbService } from 'src/app/services/indexeddatabase/indexdb.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent{
  //ngxbootstrap
  modalRef?: BsModalRef;
  modalprojectid: any;
  modaleid: any;
  modalisactive: any;
  modalprojectname: any;
  mdoaleditedprojectname: any;

  //usercheck
  usertype= false;

  previousid = '999999999999';


  projectname= '';
  allprojects: project[] = [];


  @Output() projectid = new EventEmitter<string>();


  constructor(private dbservice: IndexdbService, private modalService: BsModalService,private notify: NotificationService) {
    this.dbservice.getallproject();
    this.dbservice._project.subscribe(data => {
      if (localStorage.getItem('type') == 'employee') {
        this.usertype = false;
        const filteredprojectsforemployee = data.filter(p => p.eid.includes(String(localStorage.getItem('id'))) && p.isactive == true);

        this.allprojects = filteredprojectsforemployee;
      } else {
        this.usertype = true;
        this.allprojects = data;

      }


    });


  }  
 
  //adding project by admin
  addproject() {
    this.dbservice.addproject(this.projectname, '1');
  }


  //onclick project name it will highlight project
  setprojectid(id: string) {
    this.projectid.emit(id);
    ////To highlight the selected 
    const prev = document.getElementById('project-' + this.previousid)
    if (!(prev === null)) { prev!.style.transform = 'scale(1)'; }
    const idhh = document.getElementById('project-' + id)
    idhh!.style.transform = 'scale(1.2)';
    this.previousid = id;
  }

  openProjecteditpopup(template: TemplateRef<any>, id: string, eid: any, isactive: any, modalprojectname: string) {
    this.modalprojectid = id;
    this.modaleid = eid;
    this.modalisactive = isactive;
    this.modalprojectname = modalprojectname;
    this.modalRef = this.modalService.show(template);
  }


  editproject() {
    const updatedRecord: project = {
      id: this.modalprojectid,
      eid: this.modaleid,
      isactive: this.modalisactive,
      projectname: this.mdoaleditedprojectname
    };
    
    this.dbservice.updateproject(updatedRecord);
    this.mdoaleditedprojectname = '';
    this.notify.showSuccess('Edited', 'Summery Management');
    this.modalRef?.hide();
  }

  settoggle(event: any, id: any, eid: any, modalprojectname: any) {
    if (!event.checked) {
      this.projectid.next('');
    }
    const updatedRecord: project = {
      id: id,
      eid: eid,
      isactive: event.checked,
      projectname: modalprojectname


    };
    this.dbservice.updateproject(updatedRecord);
  }


}
