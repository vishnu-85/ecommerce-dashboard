import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { environment } from '../../../environments/environment';
import { ChatResponse } from '../models/chat-response';


@Injectable({ providedIn: 'root' })
export class ChatService {
  private apiUrl = environment.apiUrl + 'chat';

  constructor(private http: HttpClient) {}

  sendMessage(query: string, sessionId: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(this.apiUrl, { query, sessionId });
  }
}