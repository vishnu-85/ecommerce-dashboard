import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects'; 
import { UserReducer } from './features/admin-dashboard/store/user.reducer';
import { UserEffects } from './features/admin-dashboard/store/user.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './features/auth/store/auth.reducer';
import { AuthEffects } from './features/auth/store/auth.effects';
import { provideHttpClient } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideStore({ auth: authReducer, user: UserReducer } ),
    provideEffects([AuthEffects, UserEffects]),
    provideRouter(routes),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: true
    })
]
};
