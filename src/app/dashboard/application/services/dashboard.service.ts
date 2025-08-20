import { DashboardHttpService } from '../../infrastructure/http/dashboard-http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetricsResponse } from '../../domain/MetricsResponse';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private readonly dashboardHttpService: DashboardHttpService) {}

  getConsumers(): Observable<number> {
    return this.dashboardHttpService.getConsumers();
  }

  getTopics(): Observable<number> {
    return this.dashboardHttpService.getTopics();
  }

  getPartitions(): Observable<number> {
    return this.dashboardHttpService.getPartitions();
  }

  getMetrics(): Observable<MetricsResponse> {
    return this.dashboardHttpService.getMetrics();
  }

  /* getBrokers(): Observable<number> {}



  getReplies(): Observable<number> {} */
}
