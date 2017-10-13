import { TestBed, fakeAsync, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { LoginService } from './login.service';


describe('LoginService', () => {

 /*Initial configuration that will run before every testcase*/
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        LoginService
      ]
    });
  });

/*Testcase to check login functionality*/
  it('Local login should return login credentials',
    inject([LoginService, XHRBackend], (loginService, mockBackend) => {
      const mockResponse = { email: "abc@gmail.com", pwd: "12345" };
      mockBackend.connections.subscribe((connection) => {
        console.log(connection, "Coder");
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      loginService.findUser("abc@gmail.com", "12345").subscribe((user) => {
        expect(user.email).toEqual('abc@gmail.com');
        expect(user.pwd).toEqual('12345');

      });

    }));

/*Testcase to check whether service is injected or not*/
  it('can instantiate service when inject service',
    inject([LoginService], (service: LoginService) => {
      expect(service instanceof LoginService).toBe(true);
    }));

/*Testcase to check whether instance of service is created or not*/
  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new LoginService(http);
    expect(service instanceof LoginService).toBe(true, 'new service should be ok');
  }));

/*Testcase to check whether mockdata is used instead of real database */
  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));

});
