import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Logout } from 'src/app/state/auth/auth.actions';
import { AuthState } from 'src/app/state/auth/auth.state';

@Component({
  selector: 'app-events-manager',
  templateUrl: './events-manager.page.html',
  styleUrls: ['./events-manager.page.scss'],
})
export class EventsManagerPage {
  @Select(AuthState.isLogged)
  isLogged$: Observable<boolean>;

  constructor(private _store: Store) {}

  logout(): void {
    this._store.dispatch(new Logout());
  }
}
