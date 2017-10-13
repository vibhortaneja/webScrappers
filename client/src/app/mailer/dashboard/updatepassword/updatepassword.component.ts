/*importing all the angular  dependencies required in the component*/
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

/*importing all the user defined  dependencies required in the component*/
import { config } from '../../../config/config';
import { SettingsService } from '../settings/settings.service';
import { UpdatepasswordService } from './updatepassword.service';

@Component({
 selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
/*UpdatePassword component class*/
export class UpdatepasswordComponent implements OnInit {
  pwdInfo: FormGroup;
  config = config;
  currentUser: any;
  email: string;
  /*constructor of component*/
  constructor(
    @Inject(FormBuilder)
    private fbPwd: FormBuilder,
      private updatepasswordService: UpdatepasswordService,
      private settingsService: SettingsService) {
   
    this.pwdInfo = fbPwd.group({
      currentPwd: ['', [Validators.required]],
      newPwd: ['', [Validators.required]],
      confirmPwd: ['', [Validators.required]],
      email:''
    });
  }
  /*method called when the component loads*/
  ngOnInit() {
    /*getting user details from local storage*/
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.email = this.currentUser.email;
    /*calling method in SettingsService to get data of user for the given email*/
    this.settingsService.getDataFromDB(this.email)
      .subscribe((res) => {
        let data = {
          email: res.email,
          currentPwd: '',
          confirmPwd: '',
          newPwd:''
        }
           /*method to display data on the form*/
           this.displayData(data);
      })
    }

  /*definition of display data*/
  displayData(data: any) {
    this.pwdInfo = this.fbPwd.group({
       email:[data.email],
       currentPwd:[data.currentPwd],
       confirmPwd:[data.confirmPwd],
       newPwd:[data.newPwd]
       })
  }
  /*method to update password*/
  updatePwdInfo(pwdInfo,email) {
    let userPwd = {
      currentPwd: pwdInfo.get('currentPwd').value,
      newPwd:pwdInfo.get('newPwd').value,
      confirmPwd:pwdInfo.get('confirmPwd').value
    }
    if(userPwd.newPwd===userPwd.confirmPwd){
      /*calling method in service*/
    	this.updatepasswordService.updateUserPwd(userPwd,email)
     .subscribe((res)=>{
       console.log(res)
     })
    }
     

  }

}
