import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ITopic } from '../../../shared/domains/ITopic';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TopicsHttpService {
  private http = inject(HttpClient);
  private url: string = `${environment.url.domain}/platform/kafka`;

  getTopics(): Observable<ITopic[]> {
    const url = `${this.url}/topics`;
    return this.http.get<ITopic[]>(url);
  }

  getTopicsByTerm(term: string): Observable<ITopic[]> {
    const url = `${this.url}/topics/search?search=${term}`;
    return this.http.get<ITopic[]>(url);
  }
}
