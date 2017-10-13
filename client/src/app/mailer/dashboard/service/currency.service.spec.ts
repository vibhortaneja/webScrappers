import { TestBed, fakeAsync, async, inject, } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { Router } from '@angular/router';

import { MockBackend } from '@angular/http/testing';
import { CurrencyService } from './currency.service';

//chart service describe suite
describe('CurrencyService', () => {
  let routerStub;
  let router: Router;
  beforeEach(() => {
    routerStub = {
      navigate: jasmine.createSpy('navigate')
    }
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        CurrencyService,
        { provide: XHRBackend, useClass: MockBackend },
        { provide: Router, useValue: routerStub }
      ]
    });
  });

  //checking  service instantiation when inject service
  it('can instantiate service when inject service',
    inject([CurrencyService], (service: CurrencyService) => {
      expect(service instanceof CurrencyService).toBe(true);
    }));

  //checking  service instantiation with new
  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new CurrencyService(http);
    expect(service instanceof CurrencyService).toBe(true, 'new service should be ok');
  }));

  //checking mockBackend as XHRBackend
  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));

  //checking navigation to login
  it('navigate to login',
    inject([CurrencyService, XHRBackend], (currencyService, mockBackend) => {

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })))
      });
      currencyService.getcurrency().subscribe((stock) => {
        expect(stock.status).toBe(200);
      })
    }));
});
