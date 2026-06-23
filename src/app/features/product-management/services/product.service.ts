import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, delay, of, tap } from 'rxjs';
import { Product, ProductFilters } from '../models/product.models';

@Injectable()
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiEndpoint = '/api/v1/products';

  // 1. Writable state signals (Private encapsulation)
  private readonly _products = signal<Product[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _filters = signal<ProductFilters>({ search: '', category: '', status: '' });

  // 2. Public Read-Only Computed Signals
  readonly products = computed(() => this._products());
  readonly loading = computed(() => this._loading());
  readonly filters = computed(() => this._filters());
  
  // Derived analytical computations
  readonly activeProductsCount = computed(() => 
    this._products().filter(p => p.status === 'Active').length
  );

  // Computed state filtering mimicking a backend server operation for the presentation layer
  readonly filteredProducts = computed(() => {
    let result = this._products();
    const currentFilters = this._filters();

    if (currentFilters.search) {
      const searchLower = currentFilters.search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.sku.toLowerCase().includes(searchLower)
      );
    }

    if (currentFilters.category) {
      result = result.filter(p => p.category === currentFilters.category);
    }

    if (currentFilters.status) {
      result = result.filter(p => p.status === currentFilters.status);
    }

    return result;
  });

  constructor() {
    this.loadProducts();
  }

  updateFilters(partialFilters: Partial<ProductFilters>): void {
    this._filters.update(current => ({ ...current, ...partialFilters }));
  }

  loadProducts(): void {
    this._loading.set(true);
    
    // Fallback Mock data matching enterprise structure until API Integration Phase
    const mockProducts: Product[] = [
      { id: 'p1', sku: 'SKU-APP-10', name: 'Enterprise Cloud Portal Integration License', description: 'Annual SaaS node subscription base package.', price: 2499.00, stockQuantity: 500, category: 'Software', status: 'Active', updatedAt: new Date() },
      { id: 'p2', sku: 'SKU-HW-88', name: 'Edge Gateway Analytics Router v4', description: 'Industrial IoT routing terminal device.', price: 849.50, stockQuantity: 34, category: 'Hardware', status: 'Active', updatedAt: new Date() },
      { id: 'p3', sku: 'SKU-SRV-02', name: 'Managed Kubernetes DevOps Support Block', description: '24/7 dedicated site reliability consulting contract hours.', price: 4500.00, stockQuantity: 12, category: 'Services', status: 'Draft', updatedAt: new Date() },
      { id: 'p4', sku: 'SKU-HW-12', name: 'Biometric Access Control Terminal', description: 'Next-gen optical secure authentication node unit.', price: 1200.00, stockQuantity: 0, category: 'Hardware', status: 'Archived', updatedAt: new Date() }
    ];

    // Simulating light network debounce latency
    setTimeout(() => {
      this._products.set(mockProducts);
      this._loading.set(false);
    }, 400);
  }

  saveProduct(productData: Partial<Product>): Observable<Product> {
    this._loading.set(true);
    const newProduct: Product = {
      id: productData.id || `p_${Date.now()}`,
      sku: productData.sku || 'SKU-GEN-00',
      name: productData.name || 'Unnamed Corporate Asset',
      description: productData.description || '',
      price: productData.price || 0,
      stockQuantity: productData.stockQuantity || 0,
      category: productData.category || 'General',
      status: productData.status || 'Draft',
      updatedAt: new Date()
    };

    return of(newProduct).pipe(
      delay(300),
      tap((saved) => {
        this._products.update(current => {
          const index = current.findIndex(p => p.id === saved.id);
          if (index !== -1) {
            const updated = [...current];
            updated[index] = saved;
            return updated;
          }
          return [saved, ...current];
        });
        this._loading.set(false);
      })
    );
  }
}