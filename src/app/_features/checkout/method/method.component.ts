import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../_store/models/app-state';
import { combineLatest } from 'rxjs';
import { UserService } from '../../../_services/user.service';
import { PizzaMagicShop } from '../../../_interfaces/pizza-magic.shop';
import { ShopService } from '../../../_services/shop.service';
import { SetFavouriteMethodAction } from 'src/app/_store/actions/favourite.actions';

@Component({
  selector: 'checkout-method',
  templateUrl: './method.component.html',
  styleUrls: ['./method.component.scss']
})
export class MethodComponent implements OnInit {

  favoriteMethod: string;
  selectedShop: PizzaMagicShop;

  constructor(private userService: UserService,
    private shopService: ShopService,
    private store: Store<AppState>) { }

  ngOnInit() {
    combineLatest(this.store.select(store => store.favourite),
    this.shopService.getAllShops(),
    this.userService.getUserPreferences()).subscribe(
      ([favorite, shops, preferences]: any) => {
        if (favorite && favorite.fulfillment_method) this.favoriteMethod = favorite.fulfillment_method;
          // check if a shop was pre-selected  
        if (favorite && favorite.shop) {
          this.selectedShop = shops.find(({ name }) => name === favorite.shop.name);
        }
      }
    );
  }

  selectMethod(method) {
    this.store.dispatch(new SetFavouriteMethodAction(method));
  }

}
