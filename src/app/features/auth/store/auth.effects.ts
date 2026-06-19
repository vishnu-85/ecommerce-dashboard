import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
 
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router'; 
import { AuthService } from '../../../core/services/auth.service';
import { StorageService } from '../../../core/services/storage.service';

@Injectable()
export class AuthEffects {

  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  private storageService = inject(StorageService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.authService.login(action.email, action.password).pipe(
          map(user => AuthActions.loginSuccess({ user })),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      map((result) => {
        this.storageService.set('user', result.user);
      }),
      tap(() => {
        this.router.navigate(['/admin']);
      })
    ),
    { dispatch: false } // important
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => {
        const user =  this.storageService.get('user');
        if (user) {
          return AuthActions.loginSuccess({ user: user });
        }
        return { type: 'NO_ACTION' };
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.storageService.clear();
        this.router.navigate(['/']);
      })
    ),
    { dispatch: false }
  );

}