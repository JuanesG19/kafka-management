import { Component } from '@angular/core';
import { LoginComponent } from './shared/components/login/components/login/login.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, LoginComponent],
})
export class AppComponent {
  title = 'angular-electron';
}
