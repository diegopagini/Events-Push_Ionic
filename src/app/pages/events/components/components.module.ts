import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EventsListComponent } from './events-list/events-list.component';

@NgModule({
  declarations: [EventsListComponent],
  imports: [CommonModule],
  exports: [EventsListComponent],
})
export class ComponentsModule {}
