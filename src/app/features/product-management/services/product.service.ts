import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, delay, of, tap } from 'rxjs';
import { Product, ProductFilters } from '../models/product.models';
import { APIENDPOINT } from '../../../core/apiEndpoint/api-end-points';
import { environment } from '../../../../environments/environment'

@Injectable()
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

  updateFilters(partialFilters: Partial<ProductFilters>): void {
    this._filters.update(current => ({ ...current, ...partialFilters }));
  }

  loadProducts(): void {
    this._loading.set(true);
    

    this.httpClient.get(this.baseUrl+APIENDPOINT.products).pipe().subscribe({
      next:(res:any)=>{
        let prodlist = res.products;
        prodlist =  prodlist.map((e:any)=>{
           return{...e, status: 'Active'}
          });
      this._products.set(prodlist);
      this._loading.set(false);
      },
      error:(err)=>{
       this._loading.set(false);
      }
    })
    
  }

  saveProduct(productData: Partial<Product>): Observable<Product> {
    this._loading.set(true);
    const newProduct: Product = {
      id: productData.id || 0,
      title: productData.title || '',
      name: productData.title || '',
      description: productData.description || '',
      category: productData.category || '',
      price: productData.price || 0,
      discountPercentage: productData.discountPercentage || 0,
      rating: productData.rating || 0,
      stock: productData.stock || 0,
      tags: productData.tags || [],
      brand: productData.brand || '',
      sku: productData.sku || '',
      weight: productData.weight || 0,
      dimensions: productData.dimensions || { 
        width: 0,
        height: 0,
        depth: 0,
      },
      warrantyInformation: productData.warrantyInformation || '',
      shippingInformation: productData.shippingInformation || '',
      availabilityStatus: productData.availabilityStatus || '',
      reviews: productData.reviews || [],
      returnPolicy: productData.returnPolicy || '',
      minimumOrderQuantity: productData.minimumOrderQuantity || 0,
      meta: productData.meta || { createdAt: '',
        updatedAt: '',
        barcode: '',
        qrCode: ''
      },
      images: productData.images || [],
      thumbnail: productData.thumbnail || '',
      status: 'Active'
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