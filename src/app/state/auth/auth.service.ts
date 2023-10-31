import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Auth, getAuth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth;

  constructor(fApp: FirebaseApp, private readonly afAuth: AngularFireAuth) {
    this.auth = getAuth(fApp);
  }

  login({ email, password }: User) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  getAuth(): Auth {
    return this.auth;
  }
}
