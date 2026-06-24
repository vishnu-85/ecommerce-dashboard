import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { CustomerService } from '../../services/customer.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { Customer, CustomerStatus } from '../../models/customer.models';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    PageHeaderComponent,
    CurrencyPipe,
    DatePipe,
    PercentPipe
  ],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss'
})
export class CustomerDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly customerService = inject(CustomerService);
  private readonly snackBar = inject(MatSnackBar);

  readonly customerProfile = signal<Customer | null>(null);

  // Compute operational parameters on demand from internal state metrics
  readonly usageRatio = computed(() => {
    const data = this.customerProfile();
    if (!data || data.financials.creditLimit === 0) return 0;
    return data.financials.creditUtilized / data.financials.creditLimit;
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const match = this.customerService.filteredCustomers().find(c => c.id === id);
      if (match) this.customerProfile.set(match);
    }
  }

  onTransitionState(target: CustomerStatus): void {
    const current = this.customerProfile();
    if (!current) return;

    this.customerService.updateAccountStatus(current.id, target).subscribe({
      next: () => {
        this.customerProfile.update(prev => prev ? { ...prev, status: target } : null);
        this.snackBar.open(`Portfolio status moved to ${target} state execution.`, 'Audit Compliance', { duration: 3500 });
      }
    });
  }
}