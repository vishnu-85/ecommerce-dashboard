import { createAction, props } from "@ngrx/store";

export const loadUser = createAction(
    '[GetUser]'
)
export const userSuccess = createAction(
    '[Loaduser]',
     props<{ users: any }>()
)

export const userFailure = createAction(
    '[Loaduser]',
    props<{ error: any }>()
)