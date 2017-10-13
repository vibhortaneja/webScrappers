//importing angular libraries
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
//importing 
import { config } from '../../config/config'
import { ForgotpasswordService } from './forgotpassword.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})

//forgotPassword class
export class ForgotpasswordComponent implements OnInit {

  config = config;
  alert: {
    type: any,
    message: any
  };

  //instaces of services created
  constructor(private ForgotpasswordService: ForgotpasswordService, private Router: Router) {}
  hero = { email: '' };
  form: FormGroup;
  emailId: string;
  ngOnInit(): void {

    this.form = new FormGroup({

      //Validation functions through regex
      'email': new FormControl(this.hero.email, [
        Validators.required ||
        Validators.minLength(4),
        Validators.pattern("[^ @]*@[^ @]*")
      ]),
    });
  }

  //email method definition
  get email() {
    return this.form.get('email');
  }

  //news alert method
  newAlert(type: String, message: String) {
    this.alert = {
      type: type,
      message: message
    }
  }

  //forgot password method called 
  forgot(emailID) {
    this.ForgotpasswordService.forgotPassword(emailID)
      .subscribe((res) => {


        if (res) {
          this.emailId = res.email;
          console.log(res.email)
          swal({
            timer: 2000,
            title: "An Email Has Been Sent To You!",
            type: 'success',
            showConfirmButton: false,
          }).then(() => {},
            (dismiss) => {

              if (dismiss === 'timer') {
                //navigate here
                this.Router.navigateByUrl('login')
              }
            });
        }
      }, error => {
        this.newAlert('none', 'email id not correct')

      })

  }

}
