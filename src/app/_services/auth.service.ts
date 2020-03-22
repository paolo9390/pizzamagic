import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(body): Observable<any> {
    return this.http.post<any>(`http://localhost:5000/api/user/login`, body);
  }
}
