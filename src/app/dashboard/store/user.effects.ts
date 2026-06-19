import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { loadUser, userSuccess, userFailure} from './user.actions';
import {  catchError, map, of, switchMap } from "rxjs";
import { UserService } from "../../shared/services/user.service";

@Injectable()
export class UserEffects{
     private actions$ = inject(Actions);

     private userService = inject(UserService)

      loadUser$ = createEffect(() =>
        this.actions$.pipe(
        ofType(loadUser),
        switchMap(()=>
            this.userService.getuser().pipe(
                map((user)=> userSuccess({users : user})),
                catchError((error) => of(userFailure({error: error}))
                )
            ) 
        )
        )
    );

 

 
}
 