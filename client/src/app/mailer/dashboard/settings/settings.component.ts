import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

import { config } from '../../../config/config';
import { SettingsService } from './settings.service';
import { PreferenceComponent } from '../../preference/preference.component';
import { DialogService } from "ng2-bootstrap-modal";
import swal from 'sweetalert2';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  userInfo: FormGroup;
  config = config;
  currentUser: any;
  email: string;
  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    private settingsService: SettingsService, private dialogService: DialogService) {
    // initialising user details to be displayed
    this.userInfo = fb.group({
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      alternateEmail: ''
    });
  }

  ngOnInit() {
    console.log(config);
    // getting details from local storage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.email = this.currentUser.email;

    // calling method to get user details from database for the user who has logged in
    this.settingsService.getDataFromDB(this.email)
      .subscribe((res) => {
        let data = {
          email: res.email,
          name: res.name,
          mobile: res.mobile,
          alternateEmail: res.alternateEmail
        }
        this.displayData(data);
      })
  }
  // displaying the user details to be displayed
  displayData(data: any) {
    this.userInfo = this.fb.group({
      email: [data.email],
      name: [data.name],
      mobile: [data.mobile],
      alternateEmail: [data.alternateEmail],
    })
  }
  // method to update user details
  updateUserInfo(userInfo, email) {
    let user = {
      name: userInfo.get('name').value,
      mobile: userInfo.get('mobile').value,
      alternateEmail: userInfo.get('alternateEmail').value
    }
    this.settingsService.updateUser(user, email)
      .subscribe((res) => {
        if (res) {
          swal({
            title: "Details saved successfully",
            type: "success",
          });
        }
      })
  }
  // method to update mailing preferences
  showConfirm() {
    let disposable = this.dialogService.addDialog(PreferenceComponent, {
        title: 'Confirm title',
        message: 'Confirm message'
      })
      .subscribe((isConfirmed) => {
        //We get dialog result
        if (isConfirmed) {
          swal({
            title: "Preferences set successfully",
            type: "success",
          });
        } else {
        }
      });
  }
}
