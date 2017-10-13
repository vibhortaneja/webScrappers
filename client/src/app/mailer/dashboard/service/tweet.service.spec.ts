import { TestBed, fakeAsync, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TweetService } from './tweet.service';

//test suite for tweet service
describe('TweetService', () => {

  beforeEach(() => {

    //configuring module with testing environment
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        TweetService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  //checking  service instantiation when inject service
  it('can instantiate service when inject service',
    inject([TweetService], (service: TweetService) => {
      expect(service instanceof TweetService).toBe(true);
    }));

  //checking  service instantiation with new
  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new TweetService(http);
    expect(service instanceof TweetService).toBe(true, 'new service should be ok');
  }));

  //checking mockBackend as XHRBackend
  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));
});
