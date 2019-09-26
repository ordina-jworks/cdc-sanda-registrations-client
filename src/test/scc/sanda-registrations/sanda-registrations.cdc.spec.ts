import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {LhmHttpService} from '../../../app/api/lhm.http-service';
import {createCDCModule} from '../../cdc.helper';

describe('Sanda registrations SCC', () => {
  let http: HttpClient;
  let serviceUnderTest: LhmHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule(createCDCModule([LhmHttpService]));
    http = TestBed.get(HttpClient);
    serviceUnderTest = TestBed.get(LhmHttpService);
  });

  it('should get tournaments', done => {
    serviceUnderTest.getTournamentsOpenForRegistration()
      .subscribe(
        () => {
          done();
        },
        done.fail);
  });
});
