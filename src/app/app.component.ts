import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';

import { NotificationsService } from './services/notifications.service';
import { CheckIsLogged } from './state/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private _notificationService: NotificationsService,
    private _platform: Platform,
    private _store: Store,
    private _translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this._translateService.setDefaultLang('es');
    this.initApp();
  }

  private initApp(): void {
    this._platform.ready().then(async () => {
      const language = await Device.getLanguageCode();
      if (language.value)
        this._translateService.use(language.value.slice(0, 2));

      this._notificationService.init();
      this._store.dispatch(new CheckIsLogged());
    });
  }
}
