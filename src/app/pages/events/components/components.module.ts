import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { EventComponent } from './event/event.component';
import { EventsListComponent } from './events-list/events-list.component';

@NgModule({
  declarations: [EventsListComponent, EventComponent],
  imports: [CommonModule, IonicModule, TranslateModule.forChild()],
  exports: [EventsListComponent, EventComponent],
})
export class ComponentsModule {}
