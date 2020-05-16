import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../_store/models/app-state';
import { ShoppingItem } from 'src/app/_store/models/shopping-item';
import { Observable } from 'rxjs';
import { DeleteItemAction, EditItemAction } from 'src/app/_store/actions/shopping.actions';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  shoppingCart: Observable<ShoppingItem[]>;
  shopping: ShoppingItem[];
  total: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    // current shopping cart
    this.shoppingCart = this.store.select(store => store.shopping);
    this.shoppingCart.subscribe(shopping => {
      if (shopping.length > 0) {
        this.shopping = shopping;
        this.total = 0;
        shopping.forEach(item => {
          this.total+= item.price;
        });
      }
    })

  }

  trim(val: string): string {
    return val.replace(/\-|\_/g, ' ');
  }

  removeItem(item: ShoppingItem): void {
    const amount = item.amount > 0 ? item.amount - 1 : item.amount;
    const price = item.price - (item.price/item.amount);
    
    let newItem: ShoppingItem = {
      amount: amount,
      price: price,
      product: item.product,
      type: item.type
    }

    if (item.amount > 1) this.store.dispatch(new EditItemAction(newItem));
    else this.store.dispatch(new DeleteItemAction(item));
  }

  addItem(item: ShoppingItem): void {
    const amount = item.amount > 0 ? item.amount + 1 : item.amount;
    const price = item.price + (item.price/item.amount);
    
    let newItem: ShoppingItem = {
      amount: amount,
      price: price,
      product: item.product,
      type: item.type
    }

    if (item.amount < 10) this.store.dispatch(new EditItemAction(newItem));
  }
}
