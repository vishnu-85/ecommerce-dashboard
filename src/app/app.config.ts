import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { UserReducer } from './features/users/store/user.reducer';
import { UserEffects } from './features/users/store/user.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './features/auth/store/auth.reducer';
import { AuthEffects } from './features/auth/store/auth.effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from './core/interceptors/api.interceptor';
import { ProductReducer } from './features/product-management/state/product.reducer';
import { ProductEffect } from './features/product-management/state/product.effect.';
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([apiInterceptor])),
    provideStore({ auth: authReducer, user: UserReducer, product: ProductReducer }),
    provideEffects([AuthEffects, UserEffects, ProductEffect]),
    provideRouter(routes),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: true,
    }),
  ],
};
