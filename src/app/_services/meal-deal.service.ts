import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as globals from './globals.service';
import { shareReplay } from 'rxjs/operators';
import { MenuMealDeal } from '../_interfaces/meal-deal';
import { KidsMeal } from '../_interfaces/kids-meal';

@Injectable({
  providedIn: 'root'
})
export class MealDealService {

  mealDeals$: Observable<MenuMealDeal>;
  kidsMeal$: Observable<KidsMeal[]>;

  constructor(private http: HttpClient) { }

  getMealDeals(): Observable<MenuMealDeal> {
    if (!this.mealDeals$) {
      this.mealDeals$ = this.http.get<MenuMealDeal>(`${globals.HTTP_API_URL}/meal-deals`).pipe(
        shareReplay(1)
      )
    }
    return this.mealDeals$;
  }

  getKidsMeals(): Observable<KidsMeal[]> {
    if (!this.kidsMeal$) {
      this.kidsMeal$ = this.http.get<KidsMeal[]>(`${globals.HTTP_API_URL}/kids-meal`).pipe(
        shareReplay(1)
      )
    }
    return this.kidsMeal$;
  }
}
