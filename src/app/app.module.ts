import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { httpLoaderFactory } from 'src/helpers/http-loader-factory';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthState } from './state/auth/auth.state';
import { EventsState } from './state/event/events.state';
import { NotificationsState } from './state/notifications/notifications.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      innerHTMLTemplatesEnabled: true,
    }),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    // Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    // Ngxs
    NgxsModule.forRoot([AuthState, EventsState, NotificationsState]),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: FIREBASE_OPTIONS,
      useValue: environment.firebase,
    },
    NavParams,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
