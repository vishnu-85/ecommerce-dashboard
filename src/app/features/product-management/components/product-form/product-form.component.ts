import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProductService } from '../../services/product.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    PageHeaderComponent
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);

  readonly isEditMode = signal<boolean>(false);
  public targetProductId: string | null = null;

  readonly productForm = this.fb.nonNullable.group({
    sku: ['', [Validators.required, Validators.pattern(/^SKU-[A-Z0-9]{2,8}$/)]],
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
    category: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stockQuantity: [0, [Validators.required, Validators.min(0)]],
    status: ['Draft' as 'Active' | 'Draft' | 'Archived', [Validators.required]],
    description: ['', [Validators.maxLength(500)]]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditMode.set(true);
      this.targetProductId = id;
      this.hydrateFormValue(id);
    }
  }

  private hydrateFormValue(id: string): void {
    // Read entity stream straight from memory sync during this stage iteration
    const existingProduct = this.productService.products().find(p => p.id === id);
    if (existingProduct) {
      this.productForm.patchValue({
        sku: existingProduct.sku,
        name: existingProduct.name,
        category: existingProduct.category,
        price: existingProduct.price,
        stockQuantity: existingProduct.stockQuantity,
        status: existingProduct.status,
        description: existingProduct.description
      });
    } else {
      this.snackBar.open('Target product data record was not discovered.', 'Close', { duration: 4000 });
      this.router.navigate(['/products']);
    }
  }

  onSaveAsset(): void {
    if (this.productForm.invalid) return;

    const aggregatePayload = {
      ...this.productForm.getRawValue(),
      ...(this.targetProductId ? { id: this.targetProductId } : {})
    };

    this.productService.saveProduct(aggregatePayload).subscribe({
      next: () => {
        this.snackBar.open(`Product compilation saved successfully.`, 'Success', { duration: 3000 });
        this.router.navigate(['/products']);
      }
    });
  }
}