import { Routes } from '@angular/router';
import { ProductService } from './services/product.service';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    providers: [ProductService], // Feature state instance isolation encapsulation!
    children: [
      {
        path: '',
        loadComponent: () => import('./components/product-list/product-list.component').then(m => m.ProductListComponent)
      },
      {
        path: 'manage/:id',
        loadComponent: () => import('./components/product-form/product-form.component').then(m => m.ProductFormComponent)
      }
    ]
  }
];