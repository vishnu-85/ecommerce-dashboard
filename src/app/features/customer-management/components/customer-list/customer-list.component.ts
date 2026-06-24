import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CustomerService } from '../../services/customer.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-customer-list',
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
    MatChipsModule,
    MatProgressBarModule,
    MatTooltipModule,
    PageHeaderComponent,
    CurrencyPipe
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {
  readonly customerService = inject(CustomerService);
  readonly displayedColumns: string[] = ['accountNumber', 'company', 'tier', 'ltv', 'status', 'actions'];

  onSearchChange(term: string): void {
    this.customerService.updateFilters({ search: term });
  }

  onStatusChange(statusVal: string): void {
    this.customerService.updateFilters({ status: statusVal });
  }

  onTierChange(tierVal: string): void {
    this.customerService.updateFilters({ tier: tierVal });
  }
}