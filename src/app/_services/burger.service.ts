import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as globals from './globals.service';
import { Burger } from '../_interfaces/burger';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BurgerService {

  burgers$: Observable<Burger[]>;

  constructor(private http: HttpClient) { }

  getBurgers(): Observable<Burger[]> {
    if (!this.burgers$) {
      this.burgers$ = this.http.get<Burger[]>(`${globals.HTTP_V1_URL}/burger`).pipe(
        shareReplay(1)
      )
    }
    return this.burgers$;
  }
}
