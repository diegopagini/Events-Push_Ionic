import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AddEditEventsComponent } from './add-edit-events/add-edit-events.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AddEditEventsComponent, LoginComponent],
  imports: [CommonModule],
  exports: [AddEditEventsComponent, LoginComponent],
})
export class ComponentsModule {}
