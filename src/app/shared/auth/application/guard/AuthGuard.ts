import { CanActivate, Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { AuthKeycloackService } from '../services/auth-keycloack.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly authService: AuthKeycloackService) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      alert('Debes estar loggeado para realizar esta accion');
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
