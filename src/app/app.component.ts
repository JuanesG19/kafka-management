import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './shared/components/login/components/login/login.component';
import { RouterOutlet } from '@angular/router';
import { BrokersService } from './brokers/application/services/brokers.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, LoginComponent]
})
export class AppComponent implements OnInit{
  title = 'angular-electron';

  constructor(private readonly brokerCheckService: BrokersService) {}

  ngOnInit() {
    this.brokerCheckService.checkBroker();
  }
}
