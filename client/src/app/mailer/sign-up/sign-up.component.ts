import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { SignUpService } from './sign-up.service';
import { Router } from '@angular/router';
import { config } from '../../config/config';
import swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  config = config;
  constructor(private SignUpService: SignUpService, private router: Router) {}
  //Object that store all the fields of the form 
  hero = { name: '', mobile: '', email: '', pwd: '', cpwd: '' };
  user: any;

  form: FormGroup;

  ngOnInit(): void {

    //Validation functions of register page
    this.form = new FormGroup({
      'name': new FormControl(this.hero.name, [

        //Validation functions on the name field
        Validators.required,
        Validators.minLength(3),
        Validators.pattern("[a-zA-Z]+\\.?")
      ]),
      'mobile': new FormControl(this.hero.mobile, [

        //Validation functions on the mobile field
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern("[0-9]+\\.?")
      ]),
      'email': new FormControl(this.hero.email, [

        //Validation functions on the email field
        Validators.required ||
        Validators.minLength(4),
        Validators.pattern("[^ @]*@[^ @]*")
      ]),
      'pwd': new FormControl(this.hero.pwd, [

        //Validation functions on the password field
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      'cpwd': new FormControl(this.hero.cpwd, [

        //Validation functions on the confirm password field
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
    });
  }

  //Functions to extract the data from the form
  get name() { return this.form.get('name'); }
  get mobile() { return this.form.get('mobile'); }
  get email() { return this.form.get('email'); }
  get pwd() { return this.form.get('pwd'); }
  get cpwd() { return this.form.get('cpwd'); }


  //Function to post the data to express server
  addUser(name, email, mobile, pwd, cpwd) {
    this.user = {
      "name": name,
      "email": email,
      "mobile": mobile,
      "password": pwd,
      "confirmPassword": cpwd
    }
    this.SignUpService.addUser(this.user)
      .subscribe((res) => {
        if (res) {

          //alert("email sent to your id")
          swal({
            timer: 3000,
            title: "Personalised Mailer!",
            text: "you have been successfully registered",
            type: 'success',
            showConfirmButton: false,
          }).then(() => {},
            (dismiss) => {
              if (dismiss === 'timer') {
                //navigate here
                this.router.navigateByUrl('login')

              }
            });
        } else
          this.router.navigateByUrl('signup')
      }, error => {
        console.log("Error" + error)
      })
  }
}
