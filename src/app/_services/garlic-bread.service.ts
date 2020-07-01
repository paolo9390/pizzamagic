import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GarlicBread } from '../_interfaces/garlic-bread';
import * as globals from './globals.service';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GarlicBreadService {

  breads$: Observable<GarlicBread[]>;

  constructor(private http: HttpClient) { }

  getGarlicBreads(): Observable<GarlicBread[]> {
    if (!this.breads$) {
      this.breads$ = this.http.get<GarlicBread[]>(`${globals.HTTP_V1_URL}/garlic-bread`).pipe(
        shareReplay(1)
      )
    }
    return this.breads$;
  }
}
