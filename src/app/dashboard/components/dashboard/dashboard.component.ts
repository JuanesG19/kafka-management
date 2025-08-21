import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from '../../application/services/dashboard.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MetricsResponse } from '../../domain/MetricsResponse';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [RouterLink, MatGridListModule, MatCardModule, MatButtonModule, MatTooltipModule, MatIconModule, CommonModule]
})
export class DashboardComponent implements OnInit {
  private readonly _snackBar = inject(MatSnackBar);

  consumers = signal<number>(0);
  topics = signal<number>(0);
  partitions = signal<number>(0);
  metrics: MetricsResponse | null = null;

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

  constructor(private readonly dashboardService: DashboardService) { }

  ngOnInit() {
    this.getDashboardConsumers();
    this.getDashboardTopics();
    this.getDashboardPartitions();
    this.getMetrics();
  }

  getMetrics() {
    this.dashboardService.getMetrics().subscribe({
      next: (res) => {
        this.metrics = res;
        console.log('Metrics:', res);

      },
      error: (err) => console.error(err),
    });
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

  getMetricClass(name: string, value: number | undefined | null): string {
    if (value == null) return 'neutral';

    switch (name) {
      case 'io-wait-ratio':   // porcentaje de tiempo esperando IO
        if (value < 0.2) return 'good';
        if (value < 0.5) return 'warn';
        return 'bad';

      case 'connection-count':   // conexiones abiertas
        if (value < 100) return 'good';
        if (value < 300) return 'warn';
        return 'bad';

      case 'request-rate':   // requests por segundo
        if (value > 0 && value < 500) return 'good';
        if (value < 2000) return 'warn';
        return 'bad';

      case 'connection-creation-total': // total de conexiones creadas
        if (value < 1000) return 'good';
        if (value < 5000) return 'warn';
        return 'bad';

      case 'connection-close-total': // total de conexiones cerradas
        if (value < 1000) return 'good';
        if (value < 5000) return 'warn';
        return 'bad';

      case 'request-total': // total requests acumulados
        if (value < 10000) return 'good';
        if (value < 50000) return 'warn';
        return 'bad';

      case 'network-io-total': // bytes totales en red
        if (value < 1_000_000) return 'good';
        if (value < 10_000_000) return 'warn';
        return 'bad';

      case 'select-total': // operaciones de lectura
        if (value < 5000) return 'good';
        if (value < 20000) return 'warn';
        return 'bad';

      case 'outgoing-byte-total': // bytes enviados
        if (value < 1_000_000) return 'good';
        if (value < 10_000_000) return 'warn';
        return 'bad';

      default:
        return 'neutral';
    }
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
