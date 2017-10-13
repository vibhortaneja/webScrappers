import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { SignUpService } from './sign-up.service';

//test suite of the signup service
describe('SignUpService', () => {

  beforeEach(() => {

    //configuring the module with testing environment
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        SignUpService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  //test suite of the add user
  describe('addUser()', () => {


    //test case of add user account
    it('add user account',
      inject([SignUpService, XHRBackend], (SignUpService, mockBackend) => {
        const mockResponse = { name: "admin", email: "abc@gmail.com", mobile: "1234567890", pwd: "12345678", cpwd: "12345678" };
        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        //checking that service returns the expected response  
        SignUpService.addUser().subscribe((user) => {
          expect(user.name).toEqual('admin');
          expect(user.email).toEqual('abc@gmail.com');
          expect(user.mobile).toEqual('1234567890');
          expect(user.pwd).toEqual('12345678');
          expect(user.cpwd).toEqual('12345678');

        });

      }));

    //checking the service instantiation when injected with service
    it('can instantiate service when inject service',
      inject([SignUpService], (service: SignUpService) => {
        expect(service instanceof SignUpService).toBe(true);
      }));

    //checking the service instantiation when instantiated with new
    it('can instantiate service with "new"', inject([Http], (http: Http) => {
      expect(http).not.toBeNull('http should be provided');
      let service = new SignUpService(http);
      expect(service instanceof SignUpService).toBe(true, 'new service should be ok');
    }));

    //checking whether the mockBackend is working as XHRBackend
    it('can provide the mockBackend as XHRBackend',
      inject([XHRBackend], (backend: MockBackend) => {
        expect(backend).not.toBeNull('backend should be provided');
      }));
  });


});
