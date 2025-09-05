import { CanActivate, Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { AuthKeycloackService } from '../services/auth-ws02.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly authService: AuthKeycloackService) { }

  canActivate(): boolean {
    const logged = this.authService.isLoggedIn();
    console.log('Guard check, isLoggedIn:', logged);
    if (!logged) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
