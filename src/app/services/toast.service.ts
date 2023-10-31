import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private _toastController: ToastController) {}

  async showToast(message: string, duration = 5000): Promise<void> {
    const toast = await this._toastController.create({
      message,
      duration,
      position: 'top',
    });
    await toast.present();
  }
}
