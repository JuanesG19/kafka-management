import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ITopic } from '../../../shared/domains/ITopic';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IMessage } from '../../../shared/domains/IMessage';

@Injectable({
  providedIn: 'root',
})
export class TopicsHttpService {
  private http = inject(HttpClient);
  private url: string = `${environment.url.domain}/platform-kafka-admin/kafka`;

  getTopics(): Observable<ITopic[]> {
    const url = `${this.url}/topics`;
    return this.http.get<ITopic[]>(url);
  }

  getTopicsByTerm(term: string): Observable<ITopic[]> {
    const url = `${this.url}/topicsByConsumer/${term}`;
    return this.http.get<ITopic[]>(url);
  }

  getMessagesByTopic(topic:string, offset:number, limit: number) : Observable<IMessage[]> {
    const url = `${this.url}/topics/${topic}/messages?offset=${offset}&limit=${limit}`;
    return this.http.get<IMessage[]>(url);
  }
}
