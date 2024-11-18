import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ICustomer } from '../../shared/domains/ICustomer';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConsumerHttpService {
  private readonly http = inject(HttpClient);
  private readonly url: string = `${environment.url.domain}/platform-kafka-admin/kafka`;

  constructor() {}

  getConsumers(): Observable<ICustomer[]> {
    const url = `${this.url}/consumers`;
    return this.http.get<ICustomer[]>(url);
  }
  
  searchCounsumers(term: string): Observable<ICustomer[]> {
    const url = `${this.url}/consumers/search?searchTerm=${term}`;
    return this.http.get<ICustomer[]>(url);
  }
}
