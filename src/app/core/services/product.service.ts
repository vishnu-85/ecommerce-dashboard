import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, delay, map, of, tap } from 'rxjs';
import { Product, ProductFilters } from '../models/product.models';
import { APIENDPOINT } from '../apiEndpoint/api-end-points';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly httpClient = inject(HttpClient);
  
  public baseUrl = environment.apiUrl;

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
    this._products().filter(p => p.availabilityStatus === 'Active').length
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
      result = result.filter(p => p.availabilityStatus === currentFilters.status);
    }

    return result;
  });

  constructor() {
    this.loadProducts();
  }

  

  loadProducts(){
   return this.httpClient.get(`${this.baseUrl}${APIENDPOINT.products}`);
  }

  getCategory(){
    return this.httpClient.get(`${this.baseUrl}${APIENDPOINT.products}/${APIENDPOINT.categories}`);
  }
  saveProduct(productData: Partial<Product>){
    
  }
}