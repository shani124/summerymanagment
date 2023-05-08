import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndexdbService } from 'src/app/services/indexeddatabase/indexdb.service';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { PasswordValidators } from './Validators/password-validators';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  //usercheck
  usertype= false;

  usernameavailablitycheck= false
  confirmpasscheckin= false;
  username= localStorage.getItem('username') || '';
  usernames= '';
  email= '';
  password= '';
  type= 'employee';
  isactive= true;
  confirmpassword= '';

  //public employeeaddform:FormGroup | undefined;
  employeeaddform!: FormGroup;
  submitted= false;



  constructor(private fb: FormBuilder, private router: Router, private indexdb: IndexdbService) {

  }
  ngOnInit(): void {

    if (localStorage.getItem('type') == 'employee') {
      this.usertype = false;
    } else {
      this.usertype = true;
    }


    this.employeeaddform = this.fb.group({
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
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  addemployee() {

    const formValueWithoutConfirmPass = { ...this.employeeaddform.value };
    delete formValueWithoutConfirmPass.confirmpass;
    this.indexdb.addUsere(formValueWithoutConfirmPass);
    this.employeeaddform.reset();
  }
  /*checkavailablity(event:any){
  // console.log(event.target.value)
    this.indexdb.getByIndex('users', 'username', event).subscribe((people) => {
      if(people){
       this.usernameavailablitycheck=true;
        return true;
      }else{
        this.usernameavailablitycheck=false;
        return false
      }
      
  });
  }
  
  
  
  availibity(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
  
        const value = control.value;
  
        if (!value) {
            return null;
        }
  
        
        //this.checkavailablity(value);
        const passwordValid = this.checkavailablity(value);
  
        return passwordValid! ? {usernameavailablity:true}: null;
    }
  }
  
  
  
  Confirmavailablity() {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls['username'];
      console.log("checkingvalueofcurrent: "+control.value)
      if (
        control.errors &&
        !control.errors["usernameavailablity"]
      ) {
        return;
      }
      
      if (!this.checkavailablity(control)!) {
        control.setErrors({ usernameavailablity: true });
      } else {
        control.setErrors(null);
      }
    };
  }
  
  emailsubmit(){
  
  }
  confirmpasscheck(event:any){
    if(event.target.value==this.password){
      console.log("password confirmed");
      this.confirmpasscheckin=false;
    }else{
      console.log("password not matched");
      this.confirmpasscheckin=true;
    }
  }*/

}
