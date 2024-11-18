import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      alert('Debes estar loggeado para realizar esta accion');
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
