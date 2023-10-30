import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private translateService: TranslateService,
    private platform: Platform
  ) {}

  ngOnInit(): void {
    this.translateService.setDefaultLang('es');
    this.initApp();
  }

  private initApp(): void {
    this.platform.ready().then(async () => {
      const language = await Device.getLanguageCode();
      if (language.value) this.translateService.use(language.value.slice(0, 2));
    });
  }
}
