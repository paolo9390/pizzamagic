import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SideOrder, Dip } from '../_interfaces/side-order';
import * as globals from './globals.service';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SideOrdersService {

  sides$: Observable<SideOrder[]>;
  dips$: Observable<Dip[]>;

  constructor(private http: HttpClient) { }

  getSideOrders(): Observable<SideOrder[]> {
    if (!this.sides$) {
      this.sides$ = this.http.get<SideOrder[]>(`${globals.HTTP_V1_URL}/side-orders`).pipe(
        shareReplay(1)
      )
    }
    return this.sides$;
  }

  getDips(): Observable<Dip[]> {
    if (!this.dips$) {
      this.dips$ = this.http.get<Dip[]>(`${globals.HTTP_V1_URL}/side-orders/dips`).pipe(
        shareReplay(1)
      )
    }
    return this.dips$;
  }
}
