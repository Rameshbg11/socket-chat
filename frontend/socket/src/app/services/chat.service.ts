import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  apiUrl = 'http://localhost:4000/';
  private socket = io(this.apiUrl,{
    transports: ['websocket']
  });

  constructor(public http: HttpClient,
    private authService: AuthService
  ) { }

  getGroupChat(grpName) {
    let token = this.authService.loadToken();
    let headers = new HttpHeaders({ 'Authorization': token, 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl + 'getallchats', { headers: headers });
  }

  pushMsg(obj) {
    let token = this.authService.loadToken();
    let headers = new HttpHeaders({ 'Authorization': token, 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + 'msg', obj, { headers: headers });
  }


  joinRoom(data) {
    this.socket.emit('join', data);
  }
  newUserJoined() {
    let observable = new Observable<{ user: String, message: String }>(observer => {
      this.socket.on('new user joined', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }
}
