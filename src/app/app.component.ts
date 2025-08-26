import { Component, effect } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { InactivityService } from './shared/inactivity/services/inactivity.service';
import { BrokerMonitorService } from './brokers/components/broker/brokermonitor.service';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet]
})
export class AppComponent {
  title = 'angular-electron';

  currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
      startWith(this.router.url) 
    ),
    { initialValue: this.router.url }
  );

  constructor(private readonly router: Router, private inactivityService: InactivityService, private brokerMonitor: BrokerMonitorService) {
    effect(() => {
      const url = this.currentUrl();
      const isLogin = url.includes('/login');
      if (isLogin) {
        this.inactivityService.stopTimer();
        this.brokerMonitor.stopMonitoring();
      } else {
        this.inactivityService.startTimer();
        this.brokerMonitor.startMonitoring();
      }
    });
  }

}
