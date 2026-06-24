export interface UserState {
  users: any;
  loading: boolean;
  error: any;
}

export const initialState: UserState = {
  users: null,
  loading: false,
  error: null
};