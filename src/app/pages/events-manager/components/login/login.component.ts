import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { Login } from 'src/app/state/auth/auth.actions';
import { AuthState } from 'src/app/state/auth/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _store: Store,
    private _toastService: ToastService,
    private _translateService: TranslateService
  ) {}

  ngOnInit() {
    this.userForm = this._fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login(): void {
    this._store
      .dispatch(
        new Login({
          email: this.userForm.get('email')?.value,
          password: this.userForm.get('password')?.value,
        })
      )
      .pipe(
        tap(() => {
          const isLogged: boolean = this._store.selectSnapshot(
            AuthState.isLogged
          );

          if (isLogged)
            this._toastService.showToast(
              this._translateService.instant('label.login.success')
            );
          else
            this._toastService.showToast(
              this._translateService.instant('label.login.error')
            );
        }),
        catchError((error) => {
          this._toastService.showToast(
            this._translateService.instant('label.login.error')
          );
          return throwError(() => error);
        })
      )
      .subscribe();
  }
}
