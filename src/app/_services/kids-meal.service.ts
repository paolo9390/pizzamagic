import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as globals from './globals.service';
import { HttpClient } from '@angular/common/http';
import { KidsMeal } from '../_interfaces/kids-meal';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KidsMealService {

  kidsMeal$: Observable<KidsMeal[]>;

  constructor(private http: HttpClient) { }

  getKidsMeals(): Observable<KidsMeal[]> {
    if (!this.kidsMeal$) {
      this.kidsMeal$ = this.http.get<KidsMeal[]>(`${globals.HTTP_V1_URL}/kids-meal`).pipe(
        shareReplay(1)
      )
    }
    return this.kidsMeal$;
  }
}
