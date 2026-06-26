export interface productState {
    product: { products:any[] },
    loading: boolean,
    error: any 
}

export const initialState: productState = {
  product: {products: [] },
  loading: false,
  error: null
};