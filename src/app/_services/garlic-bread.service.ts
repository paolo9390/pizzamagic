import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GarlicBread } from '../_interfaces/garlic-bread';
import * as globals from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class GarlicBreadService {

  constructor(private http: HttpClient) { }

  getGarlicBreads(): Observable<GarlicBread[]> {
    return this.http.get<GarlicBread[]>(`${globals.HTTP_API_URL}/garlic-bread`);
  }
}
