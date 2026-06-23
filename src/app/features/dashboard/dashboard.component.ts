import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

// Local domain types for strict type conformity
interface MetricCard {
  title: string;
  value: string | number;
  icon: string;
  colorClass: string;
  trend: number; // Percentage change
}

interface RecentActivity {
  id: string;
  reference: string;
  customer: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  timestamp: Date;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    PageHeaderComponent,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  // Main data sources driven by writable signals
  readonly metrics = signal<MetricCard[]>([]);
  readonly recentActivities = signal<RecentActivity[]>([]);
  
  // Data columns configured for the Material Data Table view
  readonly displayedColumns: string[] = ['reference', 'customer', 'amount', 'status', 'timestamp'];

  // Derived high-performance state computed straight from data sources
  readonly systemAlertCount = computed<number>(() => {
    return this.recentActivities().filter(act => act.status === 'Failed').length;
  });

  ngOnInit(): void {
    this.loadDashboardSnapshot();
  }

  private loadDashboardSnapshot(): void {
    // Enterprise Pattern: Simulated data load from domain services
    // Real API integration layer maps directly here in later phases
    this.metrics.set([
      { title: 'Total Revenue', value: 124500.85, icon: 'payments', colorClass: 'revenue-card', trend: 12.5 },
      { title: 'Active Orders', value: 48, icon: 'shopping_cart', colorClass: 'orders-card', trend: 4.2 },
      { title: 'New Corporate Clients', value: 14, icon: 'group_add', colorClass: 'clients-card', trend: -2.1 },
      { title: 'Critical Stock Alerts', value: 3, icon: 'warning', colorClass: 'alerts-card', trend: 0 }
    ]);

    this.recentActivities.set([
      { id: '1', reference: 'TXN-9081', customer: 'Acme Corp', amount: 14200.00, status: 'Completed', timestamp: new Date() },
      { id: '2', reference: 'TXN-9082', customer: 'Global Logistics', amount: 540.50, status: 'Pending', timestamp: new Date(Date.now() - 3600000) },
      { id: '3', reference: 'TXN-9083', customer: 'Nexus Systems', amount: 3100.00, status: 'Failed', timestamp: new Date(Date.now() - 7200000) },
      { id: '4', reference: 'TXN-9084', customer: 'Vanguard Ltd', amount: 8900.00, status: 'Completed', timestamp: new Date(Date.now() - 8640000) }
    ]);
  }

  onRefreshDashboard(): void {
    this.loadDashboardSnapshot();
  }
}