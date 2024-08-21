import { ConsumerHttpService } from '../infrastructure/consumer-http.service';
import { ICustomer } from '../../shared/domains/ICustomer';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsumerService {
  constructor(private consumerHttpService: ConsumerHttpService) {}

  getConsumers(): Observable<ICustomer[]> {
    return this.consumerHttpService.getConsumers();
  }

  /* TODO -> Hay que tiparlo cuando se defina el objeto */
  searchCounsumers(term: string): Observable<ICustomer[]> {
    return this.consumerHttpService.searchCounsumers(term);
  }
}
