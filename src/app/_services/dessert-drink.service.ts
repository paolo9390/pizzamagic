import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as globals from './globals.service';
import { DDs } from '../_interfaces/dessert-drink';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DessertDrinkService {

  dds$: Observable<DDs>;

  constructor(private http: HttpClient) { }

  getAll(): Observable<DDs> {
    if (!this.dds$) {
      this.dds$ = this.http.get<DDs>(`${globals.HTTP_V1_URL}/dessert-drinks`).pipe(
        shareReplay(1)
      )
    }
    return this.dds$;
  }
}
