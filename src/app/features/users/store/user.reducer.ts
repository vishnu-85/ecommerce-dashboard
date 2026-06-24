import { createReducer, on } from '@ngrx/store';
import { initialState } from './user.state';
import * as UserActions from './user.actions';

export const UserReducer = createReducer(
  initialState,

  on(UserActions.loadUser, (state) => ({ ...state, loading: true, error: null })),

  on(UserActions.userSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),

  on(UserActions.userFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
);
