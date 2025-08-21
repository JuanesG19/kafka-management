import { Component, EventEmitter, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthKeycloackService } from '../../../../auth/application/services/auth-keycloack.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ]
})
export class NavbarComponent {
  constructor(private readonly router: Router, private readonly authService: AuthKeycloackService) { }

  @Output() toggleDrawer = new EventEmitter<void>();

  logout() {
    console.log('Cerrando sesión...');
    this.router.navigate(['']);
    this.authService.logout();
  }
}
