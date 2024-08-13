import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { DashboardService } from '../../application/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
})
export class DashboardComponent implements OnInit {
  public brokers = signal<number>(0);
  public topics = signal<number>(0);
  public partitions = signal<number>(0);

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.getDashboardTopics();
    this.getDashboardBroker();
    this.getDashboardPartitions();
  }

  getDashboardBroker() {
    this.dashboardService.getBrokers().subscribe({
      next: (res: number) => {
        console.log('BROKERS', res);
        this.brokers.set(res);
      },
    });
  }

  getDashboardTopics() {
    this.dashboardService.getTopics().subscribe({
      next: (res: number) => {
        console.log('TOPICS', res);
        this.topics.set(res);
      },
    });
  }

  getDashboardPartitions() {
    this.dashboardService.getPartitions().subscribe({
      next: (res: number) => {
        console.log('PARTITIONS', res);
        this.partitions.set(res);
      },
    });
  }
}
