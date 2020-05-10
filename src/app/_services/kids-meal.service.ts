import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as globals from './globals.service';
import { HttpClient } from '@angular/common/http';
import { KidsMeal } from '../_interfaces/kids-meal';

@Injectable({
  providedIn: 'root'
})
export class KidsMealService {

  constructor(private http: HttpClient) { }

  getKidsMeals(): Observable<KidsMeal[]> {
    return this.http.get<KidsMeal[]>(`${globals.HTTP_API_URL}/kids-meal`);
  }
}
