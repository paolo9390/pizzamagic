import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PizzaMenu } from '../_interfaces/pizza';
import * as globals from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(private http: HttpClient) { }

  getMenu(): Observable<PizzaMenu> {
    return this.http.get<PizzaMenu>(`${globals.HTTP_API_URL}/pizza/menu`);
  }
}
