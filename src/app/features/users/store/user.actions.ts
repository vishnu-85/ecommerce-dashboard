import { createAction, props } from "@ngrx/store";

export const loadUser = createAction(
    '[GetUser]'
)
export const userSuccess = createAction(
    '[load user Success]',
     props<{ users: any }>()
)

export const userFailure = createAction(
    '[Load user Failure]',
    props<{ error: any }>()
)