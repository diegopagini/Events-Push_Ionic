import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { EventsListComponent } from './events-list/events-list.component';

@NgModule({
  declarations: [EventsListComponent],
  imports: [CommonModule, IonicModule, TranslateModule.forChild()],
  exports: [EventsListComponent],
})
export class ComponentsModule {}
