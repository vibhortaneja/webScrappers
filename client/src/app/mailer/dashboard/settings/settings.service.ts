import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import  { config } from '../../../config/config'

@Injectable()
export class SettingsService {


  constructor(private http:Http) {
   }

  // method to update user details
  updateUser(userInfo,email){
  	console.log(userInfo,email)
    const url =config.urlToServer+'/update/updateUser/'+email;
    return this.http.put(url,userInfo)
                     .map(res=>res.json(),error=>error.json())
  }
  // method to update password
  updateUserPwd(userPwdInfo,email){
  	console.log(userPwdInfo,email)
    const url =config.urlToServer+'/update/updatePassword/'+email;
    return this.http.put(url,userPwdInfo)
                     .map(res=>res.json(),error=>error.json())
  }
  
  // method to get user data from database 
  getDataFromDB(email){
    const url =config.urlToServer+'/find/findUser/'+email;
     return this.http.get(url)
                     .map(res=>res.json(),error=>error.json())

  }
}
