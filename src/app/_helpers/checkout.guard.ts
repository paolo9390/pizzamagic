import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
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

      this.store.select(store => store.basket.list).subscribe(list => {
        if (list && list.length > 0) {
          this.isBasketAllowed = true;
        }
      });

      if (!this.isBasketAllowed) this.router.navigateByUrl('/home');
      return this.isBasketAllowed;
  }
  
}
