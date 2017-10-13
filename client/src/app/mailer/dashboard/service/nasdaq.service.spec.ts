import { async, inject, TestBed } from '@angular/core/testing';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { NasdaqService as NasdaqService } from './nasdaq.service';

describe('NasdaqService (mockBackend)', () => {
  const makeHeroData = [
    { Code: "asasas", Company: 'Windstorm' }

  ];

  /*Initial configuration that will run before every testcase*/
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        NasdaqService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  /*Testcase to check whether service is injected or not*/
  it('can instantiate service when inject service',
    inject([NasdaqService], (service: NasdaqService) => {
      expect(service instanceof NasdaqService).toBe(true);
    }));

  /*Testcase to check whether mockdata is used instead of real database */
  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));

  /*Testcase to check whether instance of service is created or not*/
  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new NasdaqService(http);
    expect(service instanceof NasdaqService).toBe(true, 'new service should be ok');
  }));

  /*Testcase to check the get function in nasdaq service*/
  it('get details methods',
    inject([NasdaqService, XHRBackend], (NasdaqService, mockBackend) => {
      const mockResponse = { term: "AADA" };
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      NasdaqService.getresult().subscribe((nasdaqObj) => {
        expect(nasdaqObj.term).toEqual('AADA');
      });

    }));

  /*Testcase to check whether nasdaq stocks function is called */
  describe('when getNasdaq', () => {
    it('test getRequest function',
      inject([NasdaqService, XHRBackend], (nasdaqService, mockBackend) => {
        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(makeHeroData)

          })));
        });

        nasdaqService.getnasdaqstocks().subscribe((nasdaq) => {
          expect(nasdaq[0].Company).toEqual('Windstorm');

        });

      }));
  });

});
