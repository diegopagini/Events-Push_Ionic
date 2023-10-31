import { User } from 'src/app/interfaces/user.interface';

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: User) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class CheckIsLogged {
  static readonly type = '[Auth] Check is logged';
}
