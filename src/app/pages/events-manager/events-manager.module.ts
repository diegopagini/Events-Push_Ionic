import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { EventsManagerPageRoutingModule } from './events-manager-routing.module';
import { EventsManagerPage } from './events-manager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsManagerPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [EventsManagerPage],
})
export class EventsManagerPageModule {}
