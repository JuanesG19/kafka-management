import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './shared/components/login/components/login/login.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { BrokersService } from './brokers/application/services/brokers.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, LoginComponent]
})
export class AppComponent implements OnInit {
  title = 'angular-electron';

  constructor(private readonly brokerCheckService: BrokersService, private readonly router: Router) { }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects; // ruta final
        if (!url.includes('/login')) {
          this.brokerCheckService.checkBroker();
        }
      });


  }
}
