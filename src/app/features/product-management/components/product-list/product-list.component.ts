import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ProductService } from '../../services/product.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { Product } from '../../models/product.models';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    PageHeaderComponent,
    CurrencyPipe
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  readonly displayedColumns: string[] = ['sku', 'name', 'category', 'price', 'stock', 'status', 'actions'];

  onSearchChange(searchTerm: string): void {
    this.productService.updateFilters({ search: searchTerm });
  }

  onCategoryChange(cat: string): void {
    this.productService.updateFilters({ category: cat });
  }

  onStatusChange(stat: string): void {
    this.productService.updateFilters({ status: stat });
  }

  onRouteToCreate(): void {
    this.router.navigate(['/admin/products/manage'+'/new']);
  }
}