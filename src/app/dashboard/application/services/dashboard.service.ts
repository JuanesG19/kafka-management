import { DashboardHttpService } from '../../infrastructure/http/dashboard-http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private dashboardHttpService: DashboardHttpService) {}

  getBrokers(): Observable<number> {
    return this.dashboardHttpService.getBrokers();
  }

  getTopics(): Observable<number> {
    return this.dashboardHttpService.getTopics();
  }

  getPartitions(): Observable<number> {
    return this.dashboardHttpService.getPartitions();
  }

  /* getBrokers(): Observable<number> {}



  getReplies(): Observable<number> {} */
}
