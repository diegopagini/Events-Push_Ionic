import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ComponentsModule } from './components/components.module';
import { EventsPageRoutingModule } from './events-routing.module';
import { EventsPage } from './events.page';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    EventsPageRoutingModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  declarations: [EventsPage],
})
export class EventsPageModule {}
