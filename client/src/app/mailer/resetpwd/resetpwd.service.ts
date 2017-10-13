import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { config } from '../../config/config'

@Injectable()
export class ResetpwdService {

  constructor(private http: Http) {}
//method to reset the password by the user
  resetPassword(password, token) {
    const url = config.urlToServer + "/resetPwd/reset/" + token;
    return this.http
      .post(url, password)
      .map(res => res.json(), error => error.json());

  }

}
