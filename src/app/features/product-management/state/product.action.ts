import { createAction, props } from "@ngrx/store";

export const loadProduct = createAction(
    '[loadproduct]'
)

export const loadProductSuccess = createAction(
    '[load product success]',
    props<{product:any}>()
)

export const loadProductFail = createAction(
    '[load product fail]',
    props<{error:any}>()
)