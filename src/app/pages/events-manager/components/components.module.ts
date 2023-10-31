import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { AddEditEventsComponent } from './add-edit-events/add-edit-events.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AddEditEventsComponent, LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  exports: [AddEditEventsComponent, LoginComponent],
})
export class ComponentsModule {}
