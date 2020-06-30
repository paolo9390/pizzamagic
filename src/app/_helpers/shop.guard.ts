import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../_store/models/app-state';
import { Store } from '@ngrx/store';
import { PizzaMagicShop } from '../_interfaces/pizza-magic.shop';
import { MatDialog } from '@angular/material';
import { GeneralInfoComponent } from '../_common/general-info/general-info.component';

@Injectable({
  providedIn: 'root'
})
export class ShopGuard implements CanActivate {
  
  weekDays: string [] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  isShopSelectedOpened: boolean = false;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private dialog: MatDialog) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.store.select(store => store.favourite).subscribe(fav => {
        if (fav && fav.shop) {
          this.isShopSelectedOpened = this.validateOpeningHours(fav.shop);
        }
      });

      if (!this.isShopSelectedOpened) this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
      return this.isShopSelectedOpened;
  }
  
  validateOpeningHours(shop: PizzaMagicShop): boolean {
    const currentDate = new Date();
    const currentDay: string = this.weekDays[currentDate.getDay()];
    const currentMinutes: string = currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : `${currentDate.getMinutes()}`
    const currentTime: string = `${currentDate.getHours()}${currentMinutes}`

    for (let day of shop.opening_hours) {
      if (currentDay in day) {
        const openingHours: string = day[currentDay].open;
        const closingHours: string = day[currentDay].close;
        if (parseInt(currentTime) > parseInt(openingHours) && parseInt(currentTime) < parseInt(closingHours)) {
          return true;
        }
        else {
          this.showShopClosed(shop);
          return false;
        }
      }
    }
  }

  showShopClosed(shop: PizzaMagicShop): void {
    this.dialog.closeAll(); 
    this.dialog.open(GeneralInfoComponent, {
      maxWidth: '100vw',
      panelClass: 'full-screen-dialog',
      data: {
        title: shop.name,
        icon: 'store',
        description: `Sorry, the ${shop.name} branch is closed at this moment. Please try again later.`,
        more: {
          info: 'See opening hours',
          url: 'our-shops'
        }
      }
    });
  }
}
