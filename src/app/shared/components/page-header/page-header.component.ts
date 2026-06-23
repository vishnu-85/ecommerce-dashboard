import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDividerModule],
  template: `
    <div class="page-header-container">
      <div class="title-section">
        <h2 class="mat-headline-5">{{ title() }}</h2>
        @if (subtitle()) {
          <p class="mat-body-1 text-muted">{{ subtitle() }}</p>
        }
      </div>
      
      <div class="action-section">
        @if (showAction()) {
          <button mat-flat-button color="primary" (click)="actionClick.emit()">
            <mat-icon>{{ actionIcon() }}</mat-icon>
            {{ actionText() }}
          </button>
        }
      </div>
    </div>
    <mat-divider></mat-divider>
  `,
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
  // Modern Signal Inputs (Strict Mode Compliant)
  title = input.required<string>();
  subtitle = input<string>();
  showAction = input<boolean>(false);
  actionText = input<string>('Create');
  actionIcon = input<string>('add');

  // Modern Signal Outputs
  actionClick = output<void>();
}