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

  onSubmit() {
    if (!this.loginForm.valid) return;

    const { username, password } = this.loginForm.value;

    console.log('Intentando iniciar sesión con:', username, password);

    // Llamo al servicio para que haga la petición
    this.authService.getKeycloakTokenService({ username, password } as ISession);

    // Me suscribo **una sola vez por submit** para obtener el token
    const tokenSub = this.authService.getTokenState().subscribe(token => {
      if (token) {
        console.log('Token recibido de Keycloak:', token);
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/home']);
        this.errorMessage = null;
        tokenSub.unsubscribe(); // Desuscribo para evitar suscripciones acumuladas
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
