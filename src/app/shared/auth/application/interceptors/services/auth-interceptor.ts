import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthKeycloackService } from '../../services/auth-keycloack.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthKeycloackService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(environment.keycloack.localStorageToken);

    // 1. Si no hay token, redirige a login
    if (!token) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return throwError(() => new Error('No hay token'));
    }

    // 2. Si el token está expirado, redirige a login
    if (this.authService.isTokenExpired(token)) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return throwError(() => new Error('Token expirado'));
    }

    // 3. Clonar la request con el token en Authorization
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si el backend devuelve 401, también se forza logout
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}