import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import  { config } from '../../../config/config'

@Injectable()

export class TweetService {

  constructor(private http: Http) {}

 //this method search the tweets according to twitter handler 
  tweetSearch(user: string) {
    console.log(user);
    return this.http
      .get(config.urlToServer+'/tweets/user_timeline/' + user)
      .map((res: Response) => res.json());
  }
}
