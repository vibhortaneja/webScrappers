import { TestBed, fakeAsync,async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { SettingsService } from './settings.service';
describe('SettingsService', () => {

/*Initial configuration that will run before every testcase*/
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        SettingsService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

/*Testcase to check whether service is injected or not*/
  it('can instantiate service when inject service',
    inject([SettingsService], (service: SettingsService) => {
      expect(service instanceof SettingsService).toBe(true);
    }));

/*Testcase to check whether instance of service is created or not*/
  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new SettingsService(http);
    expect(service instanceof SettingsService).toBe(true, 'new service should be ok');
  }));

/*Testcase to check whether mockdata is used instead of real database */
  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));
});
