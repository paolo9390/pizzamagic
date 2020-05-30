import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PizzaMenu } from '../_interfaces/pizza';
import * as globals from './globals.service';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  menu$: Observable<PizzaMenu>;

  constructor(private http: HttpClient) { }

  getMenu(): Observable<PizzaMenu> {
    if (!this.menu$) {
      this.menu$ = this.http.get<PizzaMenu>(`${globals.HTTP_API_URL}/pizza/menu`).pipe(
        shareReplay(1)
      )
    }
    return this.menu$;
  }
}
