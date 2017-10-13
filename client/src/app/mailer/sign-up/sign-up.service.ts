import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { config } from '../../config/config'

@Injectable()
export class SignUpService {
  constructor(private http: Http) {}

  //method to add user by hitting the server
  addUser(user) {
    const url = config.urlToServer+'/signup/users'; 
    return this.http
      .post(url, user)
      .map(res => res.json(), error => error);
  }
}
