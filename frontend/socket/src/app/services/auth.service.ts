import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:3000/';
  expVal;
  constructor(public http: HttpClient) { }

  authenticateUser(user): any {
    console.log(user)
    return this.http.post(this.apiUrl + 'authenticate', user);
  }

  getProfile() {
    let token = this.loadToken();
    let headers = new HttpHeaders();
    headers.append('Authorization', token);
    return this.http.get(this.apiUrl + 'profile', { headers: headers });
  }

  loadToken() {
    const token = localStorage.getItem('token');
    if (token)
      return token;
    else
      return null;
  }

  storeToken(token, userObj, expVal) {
    localStorage.setItem('token', token);
    localStorage.setItem('userObj', JSON.stringify(userObj));
    this.expVal = expVal;
    let currentTime = new Date().getTime() / 1000;
  }

  // Check Token Expire
  isLoggedIn() {
    let tokenExp = this.loadToken();
    let currentTime = new Date().getTime() / 1000;
    if (currentTime > this.expVal)
      return false;
    else
      return true;
  }
}
