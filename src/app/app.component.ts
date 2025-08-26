import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { InactivityService } from './shared/inactivity/services/inactivity.service';
import { BrokerMonitorService } from './brokers/components/broker/brokermonitor.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'angular-electron';

  constructor( private readonly router: Router, private inactivityService: InactivityService,private brokerMonitor: BrokerMonitorService) { 
    this.inactivityService.startTimer();
  }

   ngOnInit() {
    this.brokerMonitor.startMonitoring();
  }
}
