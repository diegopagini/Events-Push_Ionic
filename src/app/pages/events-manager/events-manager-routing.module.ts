import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventsManagerPage } from './events-manager.page';

const routes: Routes = [
  {
    path: '',
    component: EventsManagerPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsManagerPageRoutingModule {}
