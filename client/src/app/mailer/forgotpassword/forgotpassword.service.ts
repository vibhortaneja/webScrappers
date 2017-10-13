import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { config } from '../../config/config'

@Injectable()
//forgot password service classs
export class ForgotpasswordService {

  constructor(private http: Http) {}

  //method to hit forgot password api
  forgotPassword(emailId) {
    const url = config.urlToServer + '/resetPwd/forgot/' + emailId

    return this.http
      .get(url)
      .map(res => res.json(), error => error.json());
  }
}
