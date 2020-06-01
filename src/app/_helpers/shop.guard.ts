import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../_store/models/app-state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ShopGuard implements CanActivate {
  
  isShopSelected: boolean = false;

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.store.select(store => store.favourite).subscribe(fav => {
        if (fav && fav.shop) {
          this.isShopSelected = true;
        }
      });

      if (!this.isShopSelected) this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
      return this.isShopSelected;
  }
  
}
