import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SideOrder, Dip } from '../_interfaces/side-order';
import * as globals from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class SideOrdersService {

  constructor(private http: HttpClient) { }

  getSideOrders(): Observable<SideOrder[]> {
    return this.http.get<SideOrder[]>(`${globals.HTTP_API_URL}/side-orders`);
  }

  getDips(): Observable<Dip[]> {
    return this.http.get<Dip[]>(`${globals.HTTP_API_URL}/side-orders/dips`);
  }
}
