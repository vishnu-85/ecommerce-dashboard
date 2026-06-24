import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of, tap } from 'rxjs';
import { Order, OrderFilters, OrderStatus } from '../models/order.models';

@Injectable()
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly apiEndpoint = '/api/v1/orders';

  // 1. Core State Signals
  private readonly _orders = signal<Order[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _filters = signal<OrderFilters>({ search: '', status: '' });

  // 2. Public Projections
  readonly loading = computed(() => this._loading());
  readonly filters = computed(() => this._filters());

  // Declarative Data Derivation Pipeline
  readonly filteredOrders = computed(() => {
    let current = this._orders();
    const activeFilters = this._filters();

    if (activeFilters.search) {
      const query = activeFilters.search.toLowerCase();
      current = current.filter(o => 
        o.orderNumber.toLowerCase().includes(query) ||
        o.customerName.toLowerCase().includes(query)
      );
    }

    if (activeFilters.status) {
      current = current.filter(o => o.status === activeFilters.status);
    }

    return current;
  });

  constructor() {
    this.fetchOrders();
  }

  updateFilters(partial: Partial<OrderFilters>): void {
    this._filters.update(curr => ({ ...curr, ...partial }));
  }

  private fetchOrders(): void {
    this._loading.set(true);

    // Seed mock transactional payloads matching system schema
    const mockOrders: Order[] = [
      {
        id: 'ord-101',
        orderNumber: 'ORD-2026-001',
        customerName: 'Sovereign Bank Corp',
        customerEmail: 'procurement@sovereign.com',
        totalAmount: 4998.00,
        status: 'Processing',
        createdAt: new Date(Date.now() - 14400000),
        shippingAddress: { street: '100 Financial Plaza', city: 'New York', state: 'NY', postalCode: '10005', country: 'USA' },
        items: [
          { id: 'oi-1', productId: 'p1', productName: 'Enterprise Cloud Portal Integration License', quantity: 2, unitPrice: 2499.00, totalPrice: 4998.00 }
        ]
      },
      {
        id: 'ord-102',
        orderNumber: 'ORD-2026-002',
        customerName: 'Alpha Robotics Lab',
        customerEmail: 'inventory@alpharobotics.io',
        totalAmount: 1699.00,
        status: 'Pending',
        createdAt: new Date(Date.now() - 86400000),
        shippingAddress: { street: '42 Innovation Way', city: 'Austin', state: 'TX', postalCode: '78701', country: 'USA' },
        items: [
          { id: 'oi-2', productId: 'p2', productName: 'Edge Gateway Analytics Router v4', quantity: 2, unitPrice: 849.50, totalPrice: 1699.00 }
        ]
      },
      {
        id: 'ord-103',
        orderNumber: 'ORD-2026-003',
        customerName: 'Apex Medical Systems',
        customerEmail: 'ops@apexmed.org',
        totalAmount: 1200.00,
        status: 'Shipped',
        createdAt: new Date(Date.now() - 172800000),
        shippingAddress: { street: '711 Health Sciences Blvd', city: 'Chicago', state: 'IL', postalCode: '60611', country: 'USA' },
        items: [
          { id: 'oi-3', productId: 'p4', productName: 'Biometric Access Control Terminal', quantity: 1, unitPrice: 1200.00, totalPrice: 1200.00 }
        ]
      }
    ];

    setTimeout(() => {
      this._orders.set(mockOrders);
      this._loading.set(false);
    }, 350);
  }

  updateOrderStatus(orderId: string, targetStatus: OrderStatus): Observable<Order | null> {
    this._loading.set(true);
    
    return of(null).pipe(
      delay(300),
      tap(() => {
        this._orders.update(currentList => {
          return currentList.map(order => {
            if (order.id === orderId) {
              return { ...order, status: targetStatus };
            }
            return order;
          });
        });
        this._loading.set(false);
      })
    );
  }
}