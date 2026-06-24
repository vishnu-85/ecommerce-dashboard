import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
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

import { OrderService } from '../../services/order.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
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
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent {
  readonly orderService = inject(OrderService);
  readonly displayedColumns: string[] = ['orderNumber', 'customer', 'date', 'amount', 'status', 'actions'];

  onQuerySearch(term: string): void {
    this.orderService.updateFilters({ search: term });
  }

  onStatusFilter(statusVal: string): void {
    this.orderService.updateFilters({ status: statusVal });
  }
}