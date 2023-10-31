import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ComponentsModule } from './components/components.module';
import { EventsManagerPageRoutingModule } from './events-manager-routing.module';
import { EventsManagerPage } from './events-manager.page';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    EventsManagerPageRoutingModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  declarations: [EventsManagerPage],
})
export class EventsManagerPageModule {}
