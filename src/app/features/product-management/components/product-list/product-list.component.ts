import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe, NgIf } from '@angular/common';
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

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { Store } from '@ngrx/store';
import { selectLoading, selectproduct } from '../../state/product.selectors';
import * as ProductAction from '../../state/product.action';
import { ProductService } from '../../../../core/services/product.service';
import { Observable } from 'rxjs';
import { Product, ProductFilters } from '../../../../core/models/product.models';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
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
    CurrencyPipe,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  readonly displayedColumns: string[] = [
    'thumbnail',
    'sku',
    'name',
    'category',
    'price',
    'stock',
    'status',
    'actions',
  ];

  private store = inject(Store);
  public products = signal([]);
  private readonly _filters = signal<ProductFilters>({ search: '', category: '', status: '' });
  
  public categories: any = [];
  searchItem = '';
  category = '';
  status = '';
  loading$!: Observable<any>;

  filteredProducts = computed(() => {
    let result = this.products();
    const currentFilters = this._filters();

    if (currentFilters.search) {
      const searchLower = currentFilters.search.toLowerCase();
      console.log(result);
      
      result = result.filter((p:Product) => 
        p.title.toLowerCase().includes(searchLower) || 
        p.sku.toLowerCase().includes(searchLower)
      );
    }

    if (currentFilters.category) {
       result = result.filter((p:Product) => p.category === currentFilters.category);
    }

    if (currentFilters.status) {
      result = result.filter((p:Product) => p.status === currentFilters.status);
    }

    return result;
  });

  constructor() {
    this.store.dispatch(ProductAction.loadProduct());

    let pro = this.store.select(selectproduct);
    this.loading$ = this.store.select(selectLoading);

    pro.subscribe((res) => {
      if (res && res.products.length > 0) {
        let prodlist: any = res.products.map((e: any) => {
          return { ...e, status: 'Active' };
        });
        this.products.set(prodlist);
      }
    });
  }

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.productService
      .getCategory()
      .pipe()
      .subscribe({
        next: (res) => {
          this.categories = res;
        },
        error: (err) => {},
      });
  }
  onSearchChange(searchTerm: string): void {
    this.updateFilters({ search: searchTerm });
  }

  onCategoryChange(cat: string): void {
     this.updateFilters({ category: cat });
  }

  onStatusChange(stat: string): void {
    this.updateFilters({ status: stat });
  }

  onRouteToCreate(): void {
    this.router.navigate(['/admin/products/manage' + '/new']);
  }

  updateFilters(partialFilters: Partial<ProductFilters>): void {
    this._filters.update(current => ({ ...current, ...partialFilters }));
  }
}
