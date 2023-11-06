import { Component, Input } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { EventDDR } from 'src/app/interfaces/event.ddr';
import { AuthState } from 'src/app/state/auth/auth.state';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent {
  @Input({ required: true }) event: EventDDR;

  constructor(
    private actionSheetController: ActionSheetController,
    private store: Store,
    private translateService: TranslateService
  ) {}

  clickEvent(): void {
    const isLogged = this.store.selectSnapshot(AuthState.isLogged);
    if (isLogged) this.presentActions();
  }

  private async presentActions(): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      header: this.translateService.instant('label.actions.event'),
      buttons: [
        {
          text: this.translateService.instant('label.open.url'),
          icon: 'earth-outline',
          handler: () => {},
        },
        {
          text: this.translateService.instant('label.edit.event'),
          icon: 'pencil-outline',
          handler: () => {},
        },
        {
          text: this.translateService.instant('label.remove.event'),
          icon: 'trash-outline',
          handler: () => {},
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
}
