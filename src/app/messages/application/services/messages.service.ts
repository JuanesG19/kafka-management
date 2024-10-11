import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageHttpService } from '../../infrastructure/http/partition-http.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private messageHttpService: MessageHttpService) {}



}
