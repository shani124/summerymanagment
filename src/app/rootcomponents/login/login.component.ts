import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AuthserviceService } from 'src/app/services/authservice/authservice.service';
import { IndexdbService } from 'src/app/services/indexeddatabase/indexdb.service';
import { NotificationService } from 'src/app/services/notifications/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginattempt= false;
  constructor(private router: Router, private authservice: AuthserviceService, private dbservice: NgxIndexedDBService, private notifyService: NotificationService) { }
  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.router.navigate(['/home']);
    }
  }

  username: any;
  password: any;

  loginclick() {
    this.dbservice.getByIndex('users', 'username', this.username).subscribe((people: any) => {
      if (people) {
        this.loginattempt = false;
        if (people.password == this.password) {
          this.showToasterSuccess();
          this.loginattempt = false;
          const token = this.authservice.getToken();
          const userid = people.id;
          const username = people.username;
          const email = people.email;
          const password = people.password;
          const isactive = people.isactive;

          const type = people.type;
          localStorage.setItem('id', userid);
          localStorage.setItem('username', username);
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          localStorage.setItem('type', type);
          localStorage.setItem('token', token);
          localStorage.setItem('isactive', isactive);
          this.router.navigate(['/home']);

        } else {
          this.showToasterError();
          this.loginattempt = true;
        }

      } else {
        this.showToasterError();
        this.loginattempt = true;
      }

    });

  }

  showToasterSuccess() {
    this.notifyService.showSuccess("Logged in successfully !!", "summerymanagement.com")
  }
  showToasterError() {
    this.notifyService.showError("Wrong Credentials", "summerymanagement.com")
  }

}
