/*importing angular dependencies */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*importing user defined dependencies */
import { config } from '../../../config/config'

@Injectable()
export class UpdatepasswordService {


  constructor(private http:Http) {
   }
  
  /*method to update password*/
  updateUserPwd(userPwdInfo,email){
  	/*url in api to update password*/
    const url =config.urlToServer+'/update/updatePassword/'+email;
    return this.http.post(url,userPwdInfo)
                     .map(res=>res.json(),error=>error.json())
  }

}
