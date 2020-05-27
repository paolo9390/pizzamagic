import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../_store/models/app-state';
import { Observable } from 'rxjs';
import { DeleteItemAction, EditItemAction } from '../../_store/actions/basket.actions';
import { MenuItem } from '../../_store/models/basket';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  @Input() isCheckout: boolean;

  shoppingCart: Observable<MenuItem[]>;
  shopping: MenuItem[];
  total: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    // current shopping cart
    this.shoppingCart = this.store.select(store => store.basket.list);
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

  removeItem(item: MenuItem): void {
    const quantity = item.quantity > 0 ? item.quantity - 1 : item.quantity;
    const price = item.price - (item.price/item.quantity);
    
    let newItem: MenuItem = {
      menu_item_id: item.menu_item_id,
      name: item.name,
      title: item.title,
      description: item.description,
      quantity: quantity,
      price: price,
      type: item.type,
      top_level: item.top_level,
      notes: item.notes,
      product_modifier: item.product_modifier
    }

    if (item.quantity > 1) this.store.dispatch(new EditItemAction(newItem));
    else this.store.dispatch(new DeleteItemAction(item));
  }

  addItem(item: MenuItem): void {
    const quantity = item.quantity > 0 ? item.quantity + 1 : item.quantity;
    const price = item.price + (item.price/item.quantity);
    
    let newItem: MenuItem = {
      menu_item_id: item.menu_item_id,
      name: item.name,
      title: item.title,
      description: item.description,
      quantity: quantity,
      price: price,
      type: item.type,
      top_level: item.top_level,
      notes: item.notes,
      product_modifier: item.product_modifier
    }

    if (item.quantity < 10) this.store.dispatch(new EditItemAction(newItem));
  }
}
