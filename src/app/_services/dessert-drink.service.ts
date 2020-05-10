import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as globals from './globals.service';
import { DDs } from '../_interfaces/dessert-drink';

@Injectable({
  providedIn: 'root'
})
export class DessertDrinkService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<DDs> {
    return this.http.get<DDs>(`${globals.HTTP_API_URL}/dessert-drinks`);
  }
}
