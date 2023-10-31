import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { AuthAction } from './auth.actions';
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

  @Action(AuthAction)
  add(
    { getState, setState }: StateContext<AuthStateModel>,
    { payload }: AuthAction
  ) {}
}
