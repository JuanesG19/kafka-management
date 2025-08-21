import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DashboardService } from '../../../../../dashboard/application/services/dashboard.service';

@Component({
  selector: 'app-countCards',
  standalone: true,
  templateUrl: './countCards.component.html',
  styleUrls: ['./countCards.component.css'],
  imports: [RouterLink]
})
export class CountCardsComponent implements OnInit {
  public brokers = signal<number>(0);
  public topics = signal<number>(0);
  public partitions = signal<number>(0);

  constructor(private readonly dashboardService: DashboardService) { }

  ngOnInit() {
    this.getDashboardTopics();
    this.getDashboardBroker();
    this.getDashboardPartitions();
  }

  getDashboardBroker() {
    this.dashboardService.getConsumers().subscribe({
      next: (res: number) => {
        this.brokers.set(res);
      },
    });
  }

  getDashboardTopics() {
    this.dashboardService.getTopics().subscribe({
      next: (res: number) => {
        this.topics.set(res);
      },
    });
  }

  getDashboardPartitions() {
    this.dashboardService.getPartitions().subscribe({
      next: (res: number) => {
        this.partitions.set(res);
      },
    });
  }
}
