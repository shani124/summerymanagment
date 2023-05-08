import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { BehaviorSubject} from 'rxjs';
import { date } from 'src/app/DTO/dates';
import { project } from 'src/app/DTO/project';
import { summery } from 'src/app/DTO/summery';
import { User } from 'src/app/DTO/user';


@Injectable({
  providedIn: 'root'
})
export class IndexdbService {
  private dbName = 'summerymanagment';
  private dbVersion = 1;
  private objectStoreName = 'users';
  ///projectschemahandle
  public _project = new BehaviorSubject<project[]>([]);
  public _dates = new BehaviorSubject<date[]>([]);
  public _summery = new BehaviorSubject<summery[]>([]);
  public _employees = new BehaviorSubject<User[]>([]);
  private employees: User[] = [];
  private projects: project[] = [];
  private dates: date[] = [];
  private summery: summery[] = [];
  // private projects: project[] = [];


  private indexedDb?: IDBDatabase;

  constructor(private dbservice: NgxIndexedDBService) {
    const request = indexedDB.open(this.dbName, this.dbVersion);
    request.onerror = (event) => {
      console.error('IndexedDB error:', event);
    };
    request.onsuccess = (event) => {
      this.indexedDb = request.result;
    };
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore(this.objectStoreName, { autoIncrement: true });
    };

  }
  getallusers() {
    this.dbservice.getAll(this.objectStoreName).subscribe((peoples) => {
      if (peoples.length === 0) {
        this.addUser("admin", "admin", "admin", "admin", true);
      } else {
      }
    });
  }
  getallemployees() {
    this.dbservice.getAll('users').subscribe((peoples: any) => {
      peoples.shift();
      this.employees = peoples;
      this._employees.next(this.employees);
    });
  }


  addUser(username: string, email: string, password: string, type: string, isactive: boolean) {
    this.dbservice
      .add('users', {
        username: username,
        email: email,
        password: password,
        type: type,
        isactive: isactive
      })
      .subscribe((key) => {
      });
  }

  addUsere(data: User) {
    this.dbservice
      .add('users', {
        username: data.username,
        email: data.email,
        password: data.password,
        type: data.type,
        isactive: data.isactive
      })
      .subscribe((key: any) => {
        this.employees.push(key);
        this._employees.next(this.employees);

      });
  }

  logincheck(username: string, password: string) {
    let bool: boolean;
    this.dbservice.getByIndex('users', 'username', username).subscribe((people) => {
      if (people) {
        this.dbservice.getByIndex('users', 'password', password).subscribe((peopless) => {
          if (peopless) {
            bool = true;
          } else {
            bool = false;
          }
        });
      } else {
        bool = false;
      }
      return bool;
    });
  }





  ///projectschema
  /////To Handle Project Endpoints/////////////

  addprojectforemployees(updatedParams: Partial<project>) {
    this.dbservice.update('projects', updatedParams).subscribe((storeData: any) => {
      const deleteupdate = this.projects.filter(p => !(p.id == storeData.id))
      deleteupdate.push(storeData);
      this.projects = deleteupdate;
      this._project.next(this.projects);


    }, error => console.error('Error updating record: ', error));



  }



  addproject(name: string, eid: string) {

    this.dbservice
      .add('projects', {
        projectname: name,
        eid: [eid],
        isactive: true
      })
      .subscribe((key: any) => {
        this.projects.push(key);
        this._project.next(this.projects);
      });

  }

  getallproject() {

    this.dbservice.getAll('projects').subscribe((peoples: any) => {
      this.projects = peoples;
      this._project.next(this.projects);
    });

  }

  updateproject(updatedParams: Partial<project>) {
    this.dbservice.update('projects', updatedParams).subscribe((storeData: any) => {
      const deleteupdate = this.projects.filter(p => !(p.id == storeData.id))
      deleteupdate.push(storeData);
      deleteupdate.sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        } else if (a.id < b.id) {
          return -1;
        } else {
          return 0;
        }
      })
      this.projects = deleteupdate;
      this._project.next(this.projects);

    }, error => console.error('Error updating record: ', error));

  }

  ///adding project date
  addprojectdate(datename: string, pidno: string, eid: string) {
    this.dbservice
      .add('dates', {
        date: datename,
        pid: pidno,
        eid: eid

      })
      .subscribe((key) => {
        this.dates.push(key);
        this._dates.next(this.dates);
      });

  }

  getallprojectdates() {

    this.dbservice.getAll('dates').subscribe((peoples: any) => {
      this.dates = peoples;
      this._dates.next(this.dates);
    });

  }
  /////adding summery
  addprojectsummery(heading: string, description: string, didno: string, ischecked: boolean, eid: string) {
    this.dbservice
      .add('summerylist', {
        heading: heading,
        description: description,
        ischecked: ischecked,
        did: didno,
        eid: eid

      })
      .subscribe((key) => {
        this.summery.push(key);
        this._summery.next(this.summery);
      });

  }

  getallprojectsummery() {

    this.dbservice.getAll('summerylist').subscribe((peoples: any) => {
      this.summery = peoples;
      this._summery.next(this.summery);
    });

  }

  updateprojectsummery(id: string, updatedParams: Partial<summery>) {
    this.dbservice.update('summerylist', updatedParams).subscribe((storeData: any) => {
      const deleteupdate = this.summery.filter(p => !(p.id == storeData.id))
      deleteupdate.push(storeData);
      deleteupdate.sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        } else if (a.id < b.id) {
          return -1;
        } else {
          return 0;
        }
      })
      this.summery = deleteupdate;
      this._summery.next(this.summery);

    }, error => console.error('Error updating record: ', error));

  }




}
