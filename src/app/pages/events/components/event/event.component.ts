import { Component, Input } from '@angular/core';
import { Browser } from '@capacitor/browser';
import {
  ActionSheetController,
  NavController,
  NavParams,
} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { EventDDR } from 'src/app/interfaces/event.ddr';
import { AlertService } from 'src/app/services/alert.service';
import { ToastService } from 'src/app/services/toast.service';
import { AuthState } from 'src/app/state/auth/auth.state';
import {
  DeleteEvent,
  GetFutureEvents,
} from 'src/app/state/event/events.actions';
import { EventsState } from 'src/app/state/event/events.state';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent {
  @Input({ required: true }) event: EventDDR;

  constructor(
    private actionSheetController: ActionSheetController,
    private alertService: AlertService,
    private navController: NavController,
    private navParams: NavParams,
    private store: Store,
    private translateService: TranslateService,
    private toastService: ToastService
  ) {}

  clickEvent(): void {
    const isLogged = this.store.selectSnapshot(AuthState.isLogged);
    if (isLogged) this.presentActions();
    else this.openUrl(this.event.url);
  }

  private async presentActions(): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      header: this.translateService.instant('label.actions.event'),
      buttons: [
        {
          text: this.translateService.instant('label.open.url'),
          icon: 'earth-outline',
          handler: () => {
            this.openUrl(this.event.url);
          },
        },
        {
          text: this.translateService.instant('label.edit.event'),
          icon: 'pencil-outline',
          handler: () => {
            this.passEvent();
          },
        },
        {
          text: this.translateService.instant('label.remove.event'),
          icon: 'trash-outline',
          handler: () => {
            this.removeEventConfirm();
          },
        },
        {
          text: this.translateService.instant('label.close.options'),
          icon: 'close-outline',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });

    await actionSheet.present();
  }

  private passEvent(): void {
    this.navParams.data['event'] = this.event;
    this.navController.navigateForward('events-manager');
  }

  private async openUrl(url: string): Promise<void> {
    await Browser.open({ url });
  }

  private removeEventConfirm(): void {
    this.alertService.alertConfirm({
      header: this.translateService.instant('label.confirm'),
      message: this.translateService.instant('label.remove.event.message'),
      functionOk: () => {
        this.removeEvent();
      },
      functionCancel: () => {},
    });
  }

  private removeEvent(): void {
    this.store
      .dispatch(new DeleteEvent(this.event.id))
      .pipe(
        tap(() => {
          const success = this.store.selectSnapshot(EventsState.success);
          if (success) {
            this.toastService.showToast(
              this.translateService.instant('label.remove.event.success')
            );
            this.store.dispatch(new GetFutureEvents());
          } else
            this.toastService.showToast(
              this.translateService.instant('label.remove.event.error')
            );
        }),
        catchError((error) => {
          this.toastService.showToast(
            this.translateService.instant('label.remove.event.error')
          );
          return throwError(() => error);
        })
      )
      .subscribe();
  }
}
