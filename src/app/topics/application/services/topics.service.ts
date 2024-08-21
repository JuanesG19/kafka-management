import { ITopic } from '../../../shared/domains/ITopic';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TopicsHttpService } from '../../infrastructure/http/topics-http.service';

@Injectable({
  providedIn: 'root',
})
export class TopicsService {
  constructor(private topicsHttpService: TopicsHttpService) {}

  getTopics(): Observable<ITopic[]> {
    return this.topicsHttpService.getTopics();
  }

  getTopicsByTerm(term: string): Observable<ITopic[]> {
    return this.topicsHttpService.getTopicsByTerm(term);
  }
}
