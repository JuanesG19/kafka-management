import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageHttpService } from '../../infrastructure/http/message-http.service';
import { IMessage } from '../../../shared/domains/IMessage';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private messageHttpService: MessageHttpService) {}

  /* TODO -> Hay que tiparlo cuando se defina el objeto */
  retryMessage(message: any): Observable<any>{
    return this.messageHttpService.retryMessage(message);
  }

  getAllMensajesByTopicAndPartitions(topic:string,partition:string,offset:number,limit:number):Observable<any>{
    return this.messageHttpService.getAllMensajesByTopicAndPartitions(topic,partition,offset,limit);
  }


}
