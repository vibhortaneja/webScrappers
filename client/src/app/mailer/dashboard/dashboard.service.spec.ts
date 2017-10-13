import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { Location } from "@angular/common";
import { Router } from '@angular/router';

import {
  HttpModule,
  Http,
  Response,
  BaseRequestOptions,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { DashboardService } from './dashboard.service';

/*test suit for initial configuration*/
describe('DashboardService', () => {
  let router: Router;
  let location: Location;
  let routerStub;
  beforeEach(() => {
    routerStub = {
      navigate: jasmine.createSpy('navigate')
    }
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: XHRBackend, useClass: MockBackend },
        DashboardService
      ]
    });
  });
/*instantiate service when inject service*/
  it('can instantiate service when inject service',
    inject([DashboardService], (service: DashboardService) => {
      expect(service instanceof DashboardService).toBe(true);
    }));
 /* instantiate service with "new*/

  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new DashboardService(http);
    expect(service instanceof DashboardService).toBe(true, 'new service should be ok');
  }));

/*checking mockBackend as XHRBackend*/
  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));
/*checking logout method*/
  it('navigate to login',
    inject([DashboardService, XHRBackend], (dashboardservice, mockBackend) => {

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })))
      });
      dashboardservice.signout().subscribe((sign) => {
        expect(sign.status).toBe(200);
      })
    }));

});
