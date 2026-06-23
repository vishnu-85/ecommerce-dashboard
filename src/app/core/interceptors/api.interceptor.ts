import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  
  // Clone request to append required enterprise headers
  // Note: Authorization token injection will be added in the Auth Phase
  const apiReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  return next(apiReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Global error handling strategy
      const errorMessage = error.error?.message || error.message || 'An unknown error occurred';
      snackBar.open(`System Error: ${errorMessage}`, 'Dismiss', { 
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom'
      });
      return throwError(() => error);
    })
  );
};