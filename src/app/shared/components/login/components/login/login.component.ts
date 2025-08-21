import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthKeycloackService } from '../../../../auth/application/services/auth-keycloack.service';
import { ISession } from '../../../../auth/domain/ISession';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ]
})
export class LoginComponent {
  hide = signal(true);
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private readonly fb: FormBuilder, private readonly router: Router, private readonly authService: AuthKeycloackService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  async onSubmit() {
    if (!this.loginForm.valid) return;

    const { username, password } = this.loginForm.value;

    console.log('Intentando iniciar sesión con:', username, password);

    try {
      // Espera a que llegue el token
      const token = await firstValueFrom(
        this.authService.getKeycloakTokenService({ username, password } as ISession)
      );

      console.log('Token recibido de Keycloak:', token);
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/home']);
      this.errorMessage = null;

    } catch (err) {
      console.error(err);
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }
}
