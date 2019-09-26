import {HttpClientModule} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {Matchers, PactWeb} from '@pact-foundation/pact-web';
import * as path from 'path';
import {UsersService} from '../../api/users/users.service';

const provider = new PactWeb({
  consumer: 'ui',
  provider: 'users',
  port: 1234,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  spec: 2
});

describe('Pact with Our Provider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UsersService]
    });
  });
  describe('given data count > 0', () => {
    describe('when a call to the Provider is made', () => {
      beforeAll(done => {
        provider.addInteraction({
          state: 'Provider retrieves all users',
          uponReceiving: 'a request to GET all users',
          withRequest: {
            method: 'GET',
            path: '/users',
            headers: {
              'Content-Type': 'application/json'
            }
          },
          willRespondWith: {
            status: 200,
            body: Matchers.somethingLike([]),
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }
        }).then(done, done.fail);
      });

      it('can process the JSON payload from the provider', done => {
        const usersService: UsersService = TestBed.get(UsersService);
        usersService.getAll()
          .subscribe(response => {
            provider.verify().then(done, done.fail);
          }, done.fail);
      });

      it('should validate the interactions and create a contract', () => {
        return provider.verify();
      });
    });

    // Write pact files to file
    afterAll(() => {
      return provider.finalize();
    });
  });
});
