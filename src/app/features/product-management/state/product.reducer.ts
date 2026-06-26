import { createReducer, on } from '@ngrx/store';
import { initialState } from './product.state';
import * as ProductActions from './product.action';

export const ProductReducer = createReducer(
  initialState,

  on(ProductActions.loadProduct, (state) => ({ ...state, loading: true, error: null })),

  on(ProductActions.loadProductSuccess, (state, { product }) => ({
    ...state,
    product,
    loading: false,
  })),

  on(ProductActions.loadProductFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
);
