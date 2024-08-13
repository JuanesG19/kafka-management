import { ConsumerHttpService } from '../infrastructure/consumer-http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsumerService {
  constructor(private consumerHttpService: ConsumerHttpService) {}

  /* TODO -> Hay que tiparlo cuando se defina el objeto */
  getConsumers(): Observable<any> {
    return this.consumerHttpService.getConsumers();
  }

  /* TODO -> Hay que tiparlo cuando se defina el objeto */
  searchCounsumers(term: string): Observable<any> {
    return this.consumerHttpService.searchCounsumers(term);
  }
}
