import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product.models';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    PageHeaderComponent,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);

  isEditMode = false;

  productForm!: FormGroup;
  product!: any;

  constructor() {}

  ngOnInit() {
    this.createForm();
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id != 'new') {
      this.isEditMode = true;
    } else {
      this.isEditMode = false;
    }
    if(id == 'new') return;
    this.productService.getProductsById(Number(id)).subscribe({
      next: (res) => {
        this.product = res;
        if (this.product) {
          this.patchData(this.product);
        }
      },
      error: () => {},
    });
  }

  createForm() {
    this.productForm = this.fb.group({
      id: [null],

      title: ['', Validators.required],
      description: [''],
      category: [''],
      price: [0],
      discountPercentage: [0],
      rating: [0],
      stock: [0],

      brand: [''],
      sku: [''],
      weight: [0],

      warrantyInformation: [''],
      shippingInformation: [''],
      availabilityStatus: [''],

      returnPolicy: [''],
      minimumOrderQuantity: [0],

      tags: this.fb.array([]),

      dimensions: this.fb.group({
        width: [0],
        height: [0],
        depth: [0],
      }),

      meta: this.fb.group({
        createdAt: [''],
        updatedAt: [''],
        barcode: [''],
        qrCode: [''],
      }),

      images: this.fb.array([]),

      thumbnail: [''],

      // Always empty
      reviews: this.fb.array([]),
    });
  }

  patchData(product: any) {
    this.productForm.patchValue({
      id: product.id,
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      stock: product.stock,
      brand: product.brand,
      sku: product.sku,
      weight: product.weight,
      warrantyInformation: product.warrantyInformation,
      shippingInformation: product.shippingInformation,
      availabilityStatus: product.availabilityStatus,
      returnPolicy: product.returnPolicy,
      minimumOrderQuantity: product.minimumOrderQuantity,
      thumbnail: product.thumbnail,

      dimensions: product.dimensions,

      meta: product.meta,
    });

    product.tags?.forEach((tag: string) => {
      this.tags.push(this.fb.control(tag));
    });

    product.images?.forEach((image: string) => {
      this.images.push(this.fb.control(image));
    });

     
    this.reviews.clear();
  }

  get tags() {
    return this.productForm.get('tags') as FormArray;
  }

  get images() {
    return this.productForm.get('images') as FormArray;
  }

  get reviews() {
    return this.productForm.get('reviews') as FormArray;
  }

  addTag() {
    this.tags.push(this.fb.control(''));
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  addImage() {
    this.images.push(this.fb.control(''));
  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }

  save() {
    console.log(this.productForm.getRawValue());
  }
}
