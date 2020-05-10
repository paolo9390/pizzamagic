import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as globals from './globals.service';
import { Burger } from '../_interfaces/burger';

@Injectable({
  providedIn: 'root'
})
export class BurgerService {

  constructor(private http: HttpClient) { }

  getBurgers(): Observable<Burger[]> {
    return this.http.get<Burger[]>(`${globals.HTTP_API_URL}/burger`);
  }
}
