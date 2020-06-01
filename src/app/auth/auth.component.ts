import { Component, OnInit } from '@angular/core';
import {  Address } from '../_interfaces/user';
import { UserService } from '../_services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from '../_store/models/app-state';
import { PizzaMagicShop } from '../_interfaces/pizza-magic.shop';
import { SetFavouriteShopAction, SetFavouriteAddressAction, SetFavouriteMethodAction } from '../_store/actions/favourite.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  title: string = 'Sign up or log in';
  authAction: 'login' | 'register';

  constructor(
    protected userService: UserService,
    protected store: Store<AppState>) { }

  ngOnInit() {
  }

  selectAction(action: 'login' | 'register'): void {
    this.authAction = action;
  }

  selectShop(shop: PizzaMagicShop) {
    this.store.dispatch(new SetFavouriteShopAction(shop));
  }

  selectAddress(address: Address) {
    this.store.dispatch(new SetFavouriteAddressAction(address));
  }

  selectFulfillmentMethod(method: string) {
    this.store.dispatch(new SetFavouriteMethodAction(method));
  }

  // set user preferences at login if any are found
  setUserPreferences(): void {
    this.userService.getUserPreferences().subscribe(pref => {
      if (pref) {
        this.selectShop(pref.favourite_shop)
        this.selectAddress(pref.favourite_address);
        this.selectFulfillmentMethod(pref.fulfillment_method);
      }
    })
  }

  resetAuthAction(): void {
    this.authAction = undefined;
  }
}
