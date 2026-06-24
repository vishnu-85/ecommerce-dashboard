import { Routes } from '@angular/router';
import { OrderService } from './services/order.service';

export const ORDER_ROUTES: Routes = [
  {
    path: '',
    providers: [OrderService], // Encapsulates instances within this feature lifecycle module pool
    children: [
      {
        path: '',
        loadComponent: () => import('./components/order-list/order-list.component').then(m => m.OrderListComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./components/order-detail/order-detail.component').then(m => m.OrderDetailComponent)
      }
    ]
  }
];