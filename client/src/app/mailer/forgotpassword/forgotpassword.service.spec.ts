import { TestBed, fakeAsync, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ForgotpasswordService } from './forgotpassword.service';

//test suite of forgot password service
describe('ForgotpasswordService', () => {

  beforeEach(() => {

    //configuring the module with testing environment
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ForgotpasswordService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  //checking Forget Password should return email Id
  it('Forget Password should return email Id',
    inject([ForgotpasswordService, XHRBackend], (forgotpasswordService, mockBackend) => {
      const mockResponse = { emailId: 'abc@gmail.com' };

      mockBackend.connections.subscribe((connection) => {
        console.log("ass", connection);
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      forgotpasswordService.forgotPassword().subscribe((users) => {
        expect(users.emailId).toEqual("abc@gmail.com");

      });

    }));

  //checking whether service is instantiated when injected with service
  it('can instantiate service when inject service',
    inject([ForgotpasswordService], (service: ForgotpasswordService) => {
      expect(service instanceof ForgotpasswordService).toBe(true);
    }));

  //checking whether service is instantiated when injected with new
  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new ForgotpasswordService(http);
    expect(service instanceof ForgotpasswordService).toBe(true, 'new service should be ok');
  }));

  //checking whether mockBackend is working as XHRbackend
  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));
});
