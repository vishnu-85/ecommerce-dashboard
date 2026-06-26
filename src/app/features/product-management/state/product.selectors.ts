import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productState } from './product.state';

export const selectproductState = createFeatureSelector<productState>('product');

export const selectproduct = createSelector(
  selectproductState,
  (state) => state.product
);

export const selectLoading = createSelector(
  selectproductState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectproductState,
  (state) => state.error
);