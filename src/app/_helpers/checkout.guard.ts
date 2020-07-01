import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { AppState } from '../_store/models/app-state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {
  
  isBasketAllowed: boolean = false;

  constructor(
    private router: Router,
    private store: Store<AppState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    combineLatest(this.store.select(store => store.basket.list),
    this.store.select(store => store.favourite)).subscribe(
      ([basketList, favourite]) => {
        if (favourite && favourite.shop) {
          if (basketList && basketList.length > 0) {
            this.isBasketAllowed = true;
          } else {
            this.isBasketAllowed = false;
          }
        } else {
          this.isBasketAllowed = false;
        }

      }
    );

    if (!this.isBasketAllowed) this.router.navigateByUrl('/home');
    return this.isBasketAllowed;
  }
  
}
