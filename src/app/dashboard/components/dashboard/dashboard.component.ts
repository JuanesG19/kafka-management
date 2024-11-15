import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from '../../application/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
})
export class DashboardComponent implements OnInit {
  private readonly _snackBar = inject(MatSnackBar);

  public consumers = signal<number>(0);
  public topics = signal<number>(0);
  public partitions = signal<number>(0);
  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

  ngOnInit() {

      this.getDashboardConsumers();
      this.getDashboardTopics();
      this.getDashboardPartitions();
    
  }

  getDashboardConsumers() {
    this.dashboardService.getConsumers().subscribe({
      next: (res: any) => {
        console.log('Consumers', res);
        this.consumers.set(res);
      },
    });
  }

  getDashboardTopics() {
    this.dashboardService.getTopics().subscribe({
      next: (res: any) => {
        console.log('getTopics', res);
        this.topics.set(res);
      },
    });
  }

  getDashboardPartitions() {
    this.dashboardService.getPartitions().subscribe({
      next: (res: any) => {
        console.log('PARTITIONS', res);
        this.partitions.set(res);
      },
    });
  }
}
