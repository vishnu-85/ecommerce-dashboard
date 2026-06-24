import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of, tap } from 'rxjs';
import { Customer, CustomerFilters, CustomerStatus } from '../models/customer.models';

@Injectable()
export class CustomerService {
  private readonly http = inject(HttpClient);

  // 1. Core State Signals
  private readonly _customers = signal<Customer[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _filters = signal<CustomerFilters>({ search: '', status: '', tier: '' });

  // 2. Public Projections
  readonly loading = computed(() => this._loading());
  readonly filters = computed(() => this._filters());

  // High-performance derivation pipeline triggered by source signal changes
  readonly filteredCustomers = computed(() => {
    let current = this._customers();
    const activeFilters = this._filters();

    if (activeFilters.search) {
      const query = activeFilters.search.toLowerCase();
      current = current.filter(c => 
        c.companyName.toLowerCase().includes(query) ||
        c.accountNumber.toLowerCase().includes(query) ||
        c.contact.primaryName.toLowerCase().includes(query)
      );
    }

    if (activeFilters.status) {
      current = current.filter(c => c.status === activeFilters.status);
    }

    if (activeFilters.tier) {
      current = current.filter(c => c.tier === activeFilters.tier);
    }

    return current;
  });

  constructor() {
    this.fetchCustomers();
  }

  updateFilters(partial: Partial<CustomerFilters>): void {
    this._filters.update(curr => ({ ...curr, ...partial }));
  }

  private fetchCustomers(): void {
    this._loading.set(true);

    const mockCustomers: Customer[] = [
      {
        id: 'cust-201',
        accountNumber: 'ACC-8839-XP',
        companyName: 'Sovereign Bank Corp',
        tier: 'Platinum',
        status: 'Active',
        onboardingDate: new Date('2024-03-15'),
        contact: { primaryName: 'Sarah Jenkins', primaryEmail: 'procurement@sovereign.com', primaryPhone: '+1-555-0192', designation: 'VP Global Sourcing' },
        financials: { creditLimit: 500000, creditUtilized: 124000, lifetimeValue: 894500, outstandingBalance: 45000 }
      },
      {
        id: 'cust-202',
        accountNumber: 'ACC-4412-RO',
        companyName: 'Alpha Robotics Lab',
        tier: 'Gold',
        status: 'Active',
        onboardingDate: new Date('2025-01-10'),
        contact: { primaryName: 'Marcus Vance', primaryEmail: 'inventory@alpharobotics.io', primaryPhone: '+1-555-4481', designation: 'Operations Director' },
        financials: { creditLimit: 250000, creditUtilized: 85000, lifetimeValue: 310000, outstandingBalance: 12000 }
      },
      {
        id: 'cust-203',
        accountNumber: 'ACC-9901-MD',
        companyName: 'Apex Medical Systems',
        tier: 'Silver',
        status: 'Suspended',
        onboardingDate: new Date('2023-11-04'),
        contact: { primaryName: 'Elena Rostova', primaryEmail: 'ops@apexmed.org', primaryPhone: '+1-555-9012', designation: 'Chief Compliance Officer' },
        financials: { creditLimit: 100000, creditUtilized: 98000, lifetimeValue: 120000, outstandingBalance: 98000 }
      }
    ];

    setTimeout(() => {
      this._customers.set(mockCustomers);
      this._loading.set(false);
    }, 400);
  }

  updateAccountStatus(customerId: string, targetStatus: CustomerStatus): Observable<void> {
    this._loading.set(true);
    return of(void 0).pipe(
      delay(300),
      tap(() => {
        this._customers.update(list => list.map(c => c.id === customerId ? { ...c, status: targetStatus } : c));
        this._loading.set(false);
      })
    );
  }
}