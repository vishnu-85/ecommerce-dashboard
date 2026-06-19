import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { environment } from '../../../environments/environment';
import { ChatResponse } from '../models/chat-response';


@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = environment.apiUrl + 'chat';

  constructor(private http: HttpClient) {}

  getuser(): Observable<any> {
    console.log('users$');
    
    return this.http.get<any>('https://jsonplaceholder.typicode.com/users');
  }
}