import { Component, OnInit } from '@angular/core';
import { PizzaMagicShop, ShopInfo, ShopFulfillmentMethod } from '../../../_interfaces/pizza-magic.shop';
import { ShopService } from '../../../_services/shop.service';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../_store/models/app-state';
import { SetFavouriteShopAction } from '../../../_store/actions/favourite.actions';
import { MatDialog } from '@angular/material';
import { GeneralInfoComponent } from '../../../_common/general-info/general-info.component';

@Component({
  selector: 'checkout-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  weekDays: string [] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  // shop vars 
  shops: PizzaMagicShop[];
  selectedShop: PizzaMagicShop;
  favoriteShop: PizzaMagicShop;
  shopInfo: ShopInfo;
  isEditShop: boolean = false;
  isShopClosed: boolean = false;

  selectedMethod: ShopFulfillmentMethod;

  constructor(
    private store: Store<AppState>,
    private shopService: ShopService,
    private dialog: MatDialog) { }

  ngOnInit() {
    combineLatest(this.store.select(store => store.favourite), this.shopService.getAllShops()).subscribe(
      ([favorite, shops]: any) => {
        this.shops = shops;
        if (favorite && favorite.shop) this.favoriteShop = favorite.shop;
          // check if a shop was pre-selected  
        if (this.favoriteShop) {
          this.selectedShop = this.shops.find(({ name }) => name === this.favoriteShop.name);
          this.validateOpeningHours();
        }
        // check if a method is pre-selected
        if (favorite && favorite.fulfillment_method && this.selectedShop) {
          this.selectedMethod = this.selectedShop.fulfillment_methods.find(({ name }) => name === favorite.fulfillment_method);
        }
      }
    );
  }

  editShop(): void {
    this.isEditShop = true;
  }

  // shop functions
  selectShop(shop: PizzaMagicShop): void {
    this.selectedShop = shop;
    this.isEditShop = false;
    this.store.dispatch(new SetFavouriteShopAction(shop));
    this.validateOpeningHours();
  }

  validateOpeningHours(): void {
    this.isShopClosed = false;
    const currentDate = new Date();
    const currentDay: string = this.weekDays[currentDate.getDay()];
    const currentMinutes: string = currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : `${currentDate.getMinutes()}`
    const currentTime: string = `${currentDate.getHours()}${currentMinutes}`

    for (let day of this.selectedShop.opening_hours) {
      if (currentDay in day) {
        const openingHours: string = day[currentDay].open;
        const closingHours: string = day[currentDay].close;
        if (parseInt(currentTime) > parseInt(openingHours) && parseInt(currentTime) < parseInt(closingHours)) {}
        else this.showShopClosed();
      }
    }
  }

  showShopClosed(): void {
    this.isShopClosed = true;

    this.dialog.open(GeneralInfoComponent, {
      maxWidth: '100vw',
      panelClass: 'full-screen-dialog',
      data: {
        title: this.selectedShop.name,
        icon: 'store',
        description: `Sorry, the ${this.selectedShop.name} branch is closed at this moment. Please try again later.`,
        more: {
          info: 'See opening hours',
          url: 'our-shops'
        }
      },
    });
  }

}
