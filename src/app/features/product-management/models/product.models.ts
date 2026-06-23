export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: string;
  status: 'Active' | 'Draft' | 'Archived';
  updatedAt: Date;
}

export interface ProductFilters {
  search: string;
  category: string;
  status: string;
}

export interface ProductState {
  products: Product[];
  totalCount: number;
  filters: ProductFilters;
  loading: boolean;
  selectedProductId: string | null;
}