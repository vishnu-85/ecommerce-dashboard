import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './auth/login/login';
import { Dashboard } from './dashboard/dashboard/dashboard';
import { AdminComponent } from './dashboard/admin/admin';
import { Product } from './dashboard/product/product';
import { Themes } from './dashboard/themes/themes';
import { Settings } from './dashboard/settings/settings';


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
  