import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { config } from '../../config/config'
@Injectable()
export class LoginService {

  constructor(private http: Http) {}

  findUser(email, password) {
    //console.log(credentials);
    const url = config.urlToServer + '/login/signin/' + email + "/" + password;
    return this.http
      .get(url)
      .map(res => res.json(), error => error.json());
  }

  //Method for google-auth
  google() {
    const url = config.urlToServer + '/googleAuth/auth/google'
    return this.http
      .get(url)
      .map(res => res, error => error.json());
  }
  //Method for google-auth end

  //Method for facebook-auth
  facebook() {
    const url = config.urlToServer + '/facebookAuth/auth/facebook'
    return this.http
      .get(url)
      .map(res => res, error => error.json());
  }
  //Method for facebook-auth end

  //method for set first time preference
  firstPreference(flag: number, email) {
    console.log("==flag===", flag)
    return this.http.put(config.urlToServer + '/update/flag/' + email, flag)
      .map(res => res.json());

    //method for set first time preference end
  }
}
