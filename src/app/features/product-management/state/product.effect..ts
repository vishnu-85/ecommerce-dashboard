import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, pipe, of, tap } from "rxjs";
import { ProductService } from "../../../core/services/product.service"; 
import { loadProduct, loadProductFail, loadProductSuccess } from "./product.action";

@Injectable()
export class ProductEffect {

    private action$ = inject(Actions);
    private productService = inject(ProductService)

    loadProduct$ = createEffect(()=>
    this.action$.pipe(
        ofType(loadProduct),
        switchMap(()=> 
            this.productService.loadProducts().pipe(
            map((product) => loadProductSuccess({product:product}) ),
            catchError((error)=> of(loadProductFail({error: error})))
            )
        ))
    );

} 