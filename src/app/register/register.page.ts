import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LoadingController, ToastController} from '@ionic/angular';
import {EMPTY, Observable} from 'rxjs';
import {catchError, delay, finalize} from 'rxjs/operators';
import {LhmHttpService} from '../api/lhm.http-service';
import {Tournament} from '../api/tournament';
import {SandaFighter} from './models/sandaFighter';

@Component({
  selector: 'lhm-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPage implements OnInit {

  registrant: SandaFighter = {
    email: undefined,
    weight: 0,
    birthDate: new Date(),
    name: undefined,
    firstName: undefined,
    club: undefined,
    gender: 'f'
  };
  selectedTournament: Tournament;
  tournamentList: Observable<Tournament[]>;
  loading: HTMLIonLoadingElement;
  toast: HTMLIonToastElement;

  constructor(private lhmHttpService: LhmHttpService,
              private loadingController: LoadingController,
              private toastController: ToastController) {
  }

  ngOnInit(): void {
    this.tournamentList = this.lhmHttpService.getTournamentsOpenForRegistration;
  }

  onGenderChange(gender: CustomEvent): void {
    this.registrant.gender = gender.detail.value;
  }

  trackTournamentList(item: Tournament): number {
    return item.id;
  }

  async presentLoading(): Promise<void> {
    this.loading = await this.loadingController.create({
      message: 'Registering...'
    });
    await this.loading.present();
  }

  async onRegisterClick(): Promise<void> {
    await this.presentLoading();
    this.lhmHttpService
      .registerForTournament(this.registrant, this.selectedTournament.id)
      .pipe(
        delay(5000),
        catchError(() => {
          this.presentErrortoast('Registration Failed');
          return EMPTY;
        }),
        finalize(async () => {
          await this.loading.dismiss();
        })
      )
      .subscribe();
  }

  async presentErrortoast(message: string = ''): Promise<void> {
    this.toast = await this.toastController.create({
      message,
      showCloseButton: true
    });
    await this.toast.present();
  }
}
