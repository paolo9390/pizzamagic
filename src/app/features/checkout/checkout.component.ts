import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../_store/models/app-state';
import { ShoppingItem } from 'src/app/_store/models/shopping';
import { Observable } from 'rxjs';
import { DeleteItemAction, EditItemAction } from 'src/app/_store/actions/shopping.actions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {


  shoppingCart: Observable<ShoppingItem[]>;
  shopping: ShoppingItem[];
  total: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    // current shopping cart
    this.shoppingCart = this.store.select(store => store.shopping.list);
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

  removeItem(item: ShoppingItem): void {

  }

  addItem(item: ShoppingItem): void {

  }

}
