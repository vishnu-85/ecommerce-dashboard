import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { Dashboard } from './features/admin-dashboard/dashboard/dashboard';
import { AdminComponent } from './features/admin-dashboard/admin';
import { Product } from './features/admin-dashboard/product/product';
import { Themes } from './features/admin-dashboard/themes/themes';
import { Settings } from './features/admin-dashboard/settings/settings';
import { LoginComponent } from './features/auth/login/login';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard],
    children : [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'product',
        component: Product
      },
      {
        path: 'themes',
        component: Themes
      },
      {
        path: 'settings',
        component: Settings
      }

    ]
   },
];
  