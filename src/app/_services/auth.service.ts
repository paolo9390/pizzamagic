import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthenticated, User } from '../_interfaces/user';
import * as globals from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(body): Observable<UserAuthenticated> {
    return this.http.post<UserAuthenticated>(`${globals.HTTP_API_URL}/user/login`, body);
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${globals.HTTP_API_URL}/user/me/logout`, {})
  }

  register(body): Observable<UserAuthenticated> {
    return this.http.post<UserAuthenticated>(`${globals.HTTP_API_URL}/user/register`, body)
  }
}
