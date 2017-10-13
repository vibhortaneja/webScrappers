import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { DialogService } from "ng2-bootstrap-modal";
import { config } from '../../config/config';
import swal from 'sweetalert2';
import { PreferenceComponent } from '../preference/preference.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, DialogService, HttpModule]
})
export class LoginComponent implements OnInit {
  alert: any = {};
  public myErrorMsg: string;

  constructor(private LoginService: LoginService, private router: Router, private dialogService: DialogService) {}
  value: any;
  hero = { email: '', pwd: '' };
  form: FormGroup;
  config = config;
  emailId: string;
  password: string;
  name: string;
  mobile: any;
  flag: number;
  registeredData: any;
  emailCheck: string;
  ngOnInit(): void {

    this.form = new FormGroup({ /*Validation functions through regex*/
      'email': new FormControl(this.hero.email, [
        Validators.required ||
        Validators.minLength(4),
        Validators.pattern("[^ @]*@[^ @]*")
      ]),
      'pwd': new FormControl(this.hero.pwd, [
        Validators.required,
        Validators.minLength(4)
      ]),
    });
  }
  get email() { return this.form.get('email'); }

  get pwd() { return this.form.get('pwd'); }

  //Method for Local Login with Local Storage
  checkUser(emailID, pwd) {
    this.LoginService.findUser(emailID, pwd)
      .subscribe((res) => { // getting user information from server  
          this.value = res.token;
          this.name = res.name;
          this.emailId = res.email;
          this.mobile = res.mobile;
          this.password = res.password;
          this.flag = res.flag;
          // setting user information in local storage
          localStorage.setItem('currentUser', JSON.stringify({
            token: this.value,
            email: this.emailId
          }));
          if (this.value) { // checking if retrieved token is valid or not
            if (this.flag == 0) {
              this.router.navigateByUrl('dashboard'),
                this.showConfirm()
              this.flag++;
              this.flagSet(this.flag)
            } else {
              this.router.navigateByUrl('dashboard')
               
            }
          } else {
            alert('Invalid Credentials');
          }


        },
        error => {
          this.newAlert('none', 'You have entered wrong credentials')
          this.myErrorMsg = "email id not correct";
          console.log("Error wrong email id" + error)
        })
  }


  //Method for google-auth
  loginByGoogle() {
    this.LoginService.google()
      .subscribe((res) => {
        if (res)
          this.router.navigate(["/"]).then(result => { window.location.href = res.url; });
        else {
          this.router.navigateByUrl('login')
        }
      }, error => {
        console.log("Error" + error)
      })
  }


  //Method for facebook-auth   
  loginByFacebook() {
    this.LoginService.facebook()
      .subscribe((res) => {
        if (res)
          this.router.navigate(["/"]).then(result => { window.location.href = res.url; });
        else
          this.router.navigateByUrl('login')
      }, error => {
        console.log("Error" + error)
      })
  }
  // alert method
  newAlert(type: String, message: String) {
    this.alert = {
      type: type,
      message: message
    }
  }

  //method for first time preference set
  flagSet(flag: number) {
    this.registeredData = JSON.parse(localStorage.getItem('currentUser'));
    this.emailCheck = this.registeredData.email;
    this.LoginService.firstPreference(flag, this.emailCheck).subscribe((data) => {})
  }

  //method for preference set
  showConfirm() {
    let disposable = this.dialogService.addDialog(PreferenceComponent, {
        title: 'Confirm title',
        message: 'Confirm message'
      })
      .subscribe((isConfirmed) => {
        //We get dialog result
        if (isConfirmed) {
          swal({
      timer: 1000,
      title: "Preferences are set",
      text:  "accepted",
      type:  'success',
      showConfirmButton: false,
    })
        } else {
          swal({
      timer: 1000,
      title: "Preferences are not set",
      text:  "declined",
      type: 'error',
      showConfirmButton: false,
    })
        }
      });
  }
  //method for preference set end
}
