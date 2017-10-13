import { TestBed, fakeAsync, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { FundService } from './fund.service';
describe('FundService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        FundService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  //checking  service instantiation when inject service
  it('can instantiate service when inject service',
    inject([FundService], (service: FundService) => {
      expect(service instanceof FundService).toBe(true);
    }));

  //checking  service instantiation with new
  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new FundService(http);
    expect(service instanceof FundService).toBe(true, 'new service should be ok');
  }));

  //checking mockBackend as XHRBackend
  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));
});
