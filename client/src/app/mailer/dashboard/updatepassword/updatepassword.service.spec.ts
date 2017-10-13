/*imporing angular dependencies */
import { TestBed, inject } from '@angular/core/testing';

/*importing user defined dependencies */
import { UpdatepasswordService } from './updatepassword.service';

/*Test suite */
describe('UpdatepasswordService', () => {
	/*executes before each test case*/
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdatepasswordService]
    });
  });
  /*test case to test if service exists or not*/
  it('should be created', inject([UpdatepasswordService], (service: UpdatepasswordService) => {
    expect(service).toBeTruthy();
  }));
});
