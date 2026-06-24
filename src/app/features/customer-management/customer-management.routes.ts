import { Routes } from '@angular/router';
import { CustomerService } from './services/customer.service';

export const CUSTOMER_ROUTES: Routes = [
  {
    path: '',
    providers: [CustomerService], // Scopes dependency tree initialization inside this lazy-loaded sub-route pool
    children: [
      {
        path: '',
        loadComponent: () => import('./components/customer-list/customer-list.component').then(m => m.CustomerListComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./components/customer-detail/customer-detail.component').then(m => m.CustomerDetailComponent)
      }
    ]
  }
];