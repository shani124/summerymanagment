import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidators } from 'src/app/home/childcomponents/topbar/Validators/password-validators';
import { IndexdbService } from 'src/app/services/indexeddatabase/indexdb.service';
import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {





  employeeaddforms!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private indexdb: IndexdbService, private notifyService: NotificationService) {

  }

  ngOnInit(): void {
    this.employeeaddforms = this.fb.group({
      'username': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required]),
      'confirmpass': new FormControl('', [Validators.required]),
      'isactive': new FormControl(true),
      'type': new FormControl('employee'),

    },
      {
        validators: PasswordValidators.ConfirmPasswordValidator('password', 'confirmpass')
      }



    );
  }


  addemployee() {
    this.showToasterSuccess();

    const formValueWithoutConfirmPass = { ...this.employeeaddforms.value };
    delete formValueWithoutConfirmPass.confirmpass;
    this.indexdb.addUsere(formValueWithoutConfirmPass);
    this.employeeaddforms.reset();
    this.router.navigate(['/login']);
  }

  showToasterSuccess() {
    this.notifyService.showSuccess("User Registered! Signin Now!!", "summerymanagement.com")
  }

}
