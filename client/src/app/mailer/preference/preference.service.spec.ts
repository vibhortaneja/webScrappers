import { TestBed, fakeAsync, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { PreferenceService } from './preference.service';
describe('PreferenceService', () => {

  /*Initial configuration that will run before every testcase*/
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        PreferenceService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  /*Testcase to check whether service is injected or not*/
  it('can instantiate service when inject service',
    inject([PreferenceService], (service: PreferenceService) => {
      expect(service instanceof PreferenceService).toBe(true);
    }));

  /*Testcase to check whether instance of service is created or not*/
  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new PreferenceService(http);
    expect(service instanceof PreferenceService).toBe(true, 'new service should be ok');
  }));

  /*Testcase to check whether mockdata is used instead of real database */
  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));
});
