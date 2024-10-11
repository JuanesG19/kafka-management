import { ITopic } from '../../../shared/domains/ITopic';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TopicsHttpService } from '../../infrastructure/http/topics-http.service';
import { IMessage } from '../../../shared/domains/IMessage';

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

  getMessagesByTopic(topic:string, offset:number, limit: number) : Observable<IMessage[]>{
    return this.topicsHttpService.getMessagesByTopic(topic,offset,limit);
  }
}
