import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/_store/models/app-state';
import { SetTimestampAction, ResetBasketAction } from 'src/app/_store/actions/basket.actions';

@Injectable({
  providedIn: 'root'
})
export class StorageControllerService {

  today: string = `${new Date().getDate()}${new Date().getMonth()+1}${new Date().getFullYear()}`;

  constructor(private store: Store<AppState>) { }

  getTodaysDate(): string {
    return this.today;
  }

  verifyBasketValidity(): void {
    const today = this.getTodaysDate();
    this.store.select(store => store.basket).subscribe(basket => {
      if (basket) {
        if (basket.timestamp !== today) this.resetBasketTimestamp();
      }
    });
  }

  resetBasketTimestamp(): void {
    this.store.dispatch(new SetTimestampAction(this.today));
    this.store.dispatch(new ResetBasketAction());
  }
}
