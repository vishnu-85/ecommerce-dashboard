export interface AuthState {
  user: any;
  loading: boolean;
  error: any;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
};