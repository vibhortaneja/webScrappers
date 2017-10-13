import { Injectable } from '@angular/core';
import {Http , Response} from '@angular/http';

import { config } from '../../config/config'

@Injectable()

export class PreferenceService {

//method for update preferences according to user
constructor(private http: Http) { }
insert(data:any,email:string){
  return this.http.put(config.urlToServer+'/investment/investment/'+email,data)
  .map(res=>res.json());
}
}