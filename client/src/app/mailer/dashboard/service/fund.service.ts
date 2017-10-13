import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import  { config } from '../../../config/config'

@Injectable()

//Fundservice class
export class FundService {

  constructor(private http:Http) { }

//method to get fund news from database
getfund(){
	 return this.http.get(config.urlToServer+'/postNews/fund')
	      .map(res =>
	        res.json()
	      )

}
}
