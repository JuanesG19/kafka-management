import { Injectable } from "@angular/core"
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http"
import { Observable, throwError } from "rxjs"
import { catchError } from "rxjs/operators"
import { AuthKeycloackService } from "../../services/auth-ws02.service"
import { Router } from "@angular/router"
import { TokenStoreService } from "../../services/token-store.service"

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthKeycloackService,
    private router: Router,
    private tokenStore: TokenStoreService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenStore.getAccessToken()

    if (!token || this.authService.isTokenExpired(token)) {
      this.authService.logout()
      this.router.navigate(["/login"])
      return throwError(() => new Error("No token or expired"))
    }

    const clonedReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    })

    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout()
          this.router.navigate(["/login"])
        }
        return throwError(() => error)
      }),
    )
  }
}
