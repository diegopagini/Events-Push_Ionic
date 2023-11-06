import { Component, ViewChild } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Logout } from 'src/app/state/auth/auth.actions';
import { AuthState } from 'src/app/state/auth/auth.state';

import { AddEditEventsComponent } from './components/add-edit-events/add-edit-events.component';

@Component({
  selector: 'app-events-manager',
  templateUrl: './events-manager.page.html',
  styleUrls: ['./events-manager.page.scss'],
})
export class EventsManagerPage {
  @ViewChild(AddEditEventsComponent, { static: false })
  manageEvents: AddEditEventsComponent;

  @Select(AuthState.isLogged)
  isLogged$: Observable<boolean>;

  constructor(private _navParams: NavParams, private _store: Store) {}

  ionViewWillEnter(): void {
    if (this.manageEvents) this.manageEvents.initEvents();
  }

  ionViewWillLeave(): void {
    this._navParams.data['event'] = null;
  }

  logout(): void {
    this._store.dispatch(new Logout());
  }
}
