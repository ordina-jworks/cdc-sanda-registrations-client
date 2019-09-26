import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {SandaFighter} from '../register/models/sandaFighter';
import {Tournament} from './tournament';

@Injectable({
  providedIn: 'root'
})
export class LhmHttpService {

  private readonly baseUrl = environment.api;

  constructor(private httpClient: HttpClient) {
  }

  getTournamentsOpenForRegistration: Observable<Tournament[]> = of([]);

  registerForTournament(registrant: SandaFighter, tournamentId: number): Observable<SandaFighter> {
    return of(null);
  }
}
