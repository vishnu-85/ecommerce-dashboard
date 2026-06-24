import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AdminComponent } from './layout/main-layout/admin';
import { LoginComponent } from './features/auth/login/login';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        canActivate: [authGuard],
        component: DashboardComponent,
      },
      {
        path: 'products',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/product-management/product-management.routes').then(
            (m) => m.PRODUCT_ROUTES,
          ),
      },
      {
        path: 'orders',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/order-management/order-management.routes').then((m) => m.ORDER_ROUTES),
      },
    ],
  },
];
