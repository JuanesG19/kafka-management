import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TopicsHttpService } from '../../infrastructure/http/topics-http.service';

@Injectable({
  providedIn: 'root',
})
export class TopicsService {
  constructor(private topicsHttpService: TopicsHttpService) {}

  /* TODO -> Hay que tiparlo cuando se defina el objeto */
  getTopicsByTerm(term: string): Observable<any> {
    return this.topicsHttpService.getTopicsByTerm(term);
  }

    /* TODO -> Hay que tiparlo cuando se defina el objeto */
    getTopics(): Observable<any> {
      return this.topicsHttpService.getTopics();
    }
}
