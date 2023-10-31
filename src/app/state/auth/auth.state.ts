import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { onAuthStateChanged } from 'firebase/auth';

import { CheckIsLogged, Login, Logout } from './auth.actions';
import { AuthService } from './auth.service';

export class AuthStateModel {
  isLogged: boolean;
}

const defaults = {
  isLogged: false,
};

@State<AuthStateModel>({
  name: 'auth',
  defaults,
})
@Injectable()
export class AuthState {
  constructor(private _authService: AuthService) {}

  @Selector()
  static isLogged(state: AuthStateModel) {
    return state.isLogged;
  }

  @Action(Login)
  login(
    { setState }: StateContext<AuthStateModel>,
    { payload }: Login
  ): Promise<void> {
    return this._authService
      .login(payload)
      .then((result) => {
        if (result) setState({ isLogged: true });
      })
      .catch(() => {
        setState({
          isLogged: false,
        });
      });
  }

  @Action(Logout)
  logout({ setState }: StateContext<AuthStateModel>) {
    return this._authService.logout().then(() => {
      setState({ isLogged: true });
    });
  }

  @Action(CheckIsLogged)
  checkIsLogged({ setState }: StateContext<AuthStateModel>) {
    onAuthStateChanged(this._authService.getAuth(), (user) => {
      if (user) {
        setState({ isLogged: true });
      } else setState({ isLogged: false });
    });
  }
}
