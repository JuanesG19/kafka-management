import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from '../../application/services/dashboard.service';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatGridListModule],
})
export class DashboardComponent implements OnInit {
  private readonly _snackBar = inject(MatSnackBar);

  public consumers = signal<number>(0);
  public topics = signal<number>(0);
  public partitions = signal<number>(0);

  counts = [
    {
      title: 'Total Customers',
      value: this.consumers(),
      link: '/consumers',
      style: 'background: #C8C8C8',
    },
    {
      title: 'Total Topics',
      value: this.topics(),
      link: '/topics',
      style: 'background: #C8C8C8',
    },
    {
      title: 'Total Partitions',
      value: this.partitions(),
      link: '/partitions',
      style: 'background: #C8C8C8',
    },
  ];

  panels = ['Panel 1', 'Panel 2', 'Panel 3', 'Panel 4'];

  constructor(private readonly dashboardService: DashboardService) {}

  ngOnInit() {
    this.getDashboardConsumers();
    this.getDashboardTopics();
    this.getDashboardPartitions();
  }

  getDashboardConsumers() {
    this.dashboardService.getConsumers().subscribe({
      next: (res: any) => {
        if (res.code == 500) {
          this.consumers.set(0);
        } else {
          console.log('PARTITIONS', res);
          this.consumers.set(res);
          this.updateCounts();
        }
      },
    });
  }

  getDashboardTopics() {
    this.dashboardService.getTopics().subscribe({
      next: (res: any) => {
        if (res.code == 500) {
          this.topics.set(0);
        } else {
          console.log('PARTITIONS', res);
          this.topics.set(res);
          this.updateCounts();
        }
      },
    });
  }

  getDashboardPartitions() {
    this.dashboardService.getPartitions().subscribe({
      next: (res: any) => {
        if (res.code == 500) {
          this.partitions.set(0);
        } else {
          console.log('PARTITIONS', res);
          this.partitions.set(res);
          this.updateCounts();
        }
      },
    });
  }

  private updateCounts() {
    this.counts = [
      {
        title: 'Total Customers',
        value: this.consumers(),
        link: '/consumers',
        style: 'background: #C8C8C8',
      },
      {
        title: 'Total Topics',
        value: this.topics(),
        link: '/topics',
        style: 'background: #C8C8C8',
      },
      {
        title: 'Total Partitions',
        value: this.partitions(),
        link: '/partitions',
        style: 'background: #C8C8C8',
      },
    ];
  }
}
