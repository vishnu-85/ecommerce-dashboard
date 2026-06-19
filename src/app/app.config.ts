import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './auth/store/auth.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { UserReducer } from './dashboard/store/user.reducer';
import { UserEffects } from './dashboard/store/user.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ auth: authReducer, user: UserReducer } ),
    provideEffects([AuthEffects, UserEffects]),
    provideRouter(routes),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: true
    })
]
};
