import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';

import { OrderService } from '../../services/order.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { Order, OrderStatus } from '../../models/order.models';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    PageHeaderComponent,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly orderService = inject(OrderService);
  private readonly snackBar = inject(MatSnackBar);

  readonly targetOrder = signal<Order | null>(null);
  readonly itemColumns: string[] = ['product', 'price', 'quantity', 'total'];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const match = this.orderService.filteredOrders().find(o => o.id === id);
      if (match) this.targetOrder.set(match);
    }
  }

  onChangeState(nextState: OrderStatus): void {
    const current = this.targetOrder();
    if (!current) return;

    this.orderService.updateOrderStatus(current.id, nextState).subscribe({
      next: () => {
        this.targetOrder.update(prev => prev ? { ...prev, status: nextState } : null);
        this.snackBar.open(`Order status updated to ${nextState}.`, 'Audit', { duration: 3000 });
      }
    });
  }
}