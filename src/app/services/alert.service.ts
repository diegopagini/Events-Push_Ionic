import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

interface Alert {
  header: string;
  message: string;
  functionOk: Function;
  functionCancel: Function;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private _alertController: AlertController,
    private _translateService: TranslateService
  ) {}

  async alertConfirm({
    header,
    message,
    functionCancel = () => {},
    functionOk,
  }: Alert): Promise<void> {
    const alert = await this._alertController.create({
      header,
      message,
      buttons: [
        {
          text: this._translateService.instant('label.cancel'),
          role: 'cancel',
          handler: () => functionCancel(),
        },
        {
          text: this._translateService.instant('label.ok'),
          handler: () => functionOk(),
        },
      ],
    });

    await alert.present();
  }

  async alertSuccess(header: string, message: string): Promise<void> {
    const alert = await this._alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
