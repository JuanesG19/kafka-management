import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { DashboardService } from '../../../../../dashboard/application/services/dashboard.service';

@Component({
  selector: 'app-countCards',
  templateUrl: './countCards.component.html',
  styleUrls: ['./countCards.component.css'],
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
})
export class CountCardsComponent implements OnInit {
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
        console.log('TOPICS', res);
        this.partitions.set(res);
      },
    });
  }
}
