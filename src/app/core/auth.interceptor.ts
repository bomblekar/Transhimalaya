import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth'; // Example service
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Inject services directly inside the function
  const authService = inject(Auth);
  const token = authService.getToken();

  // 2. Clone the request to add headers (Requests are immutable)
  let modifiedReq = req;
  if (token) {
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // 3. Pass the modified request to the next handler
  return next(modifiedReq).pipe(
    catchError((error) => {
      console.error('Interceptor error:', error);
      return throwError(() => error);
    })
  );
};