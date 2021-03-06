import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../_services/user.service';
import { PizzaMagicUser } from '../../_interfaces/user';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { MatIconRegistry, MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from '../../_store/models/app-state';
import { MenuItem } from '../../_store/models/basket';
import { PizzaMagicShop } from '../../_interfaces/pizza-magic.shop';
import { StorageControllerService } from '../../core/services/storage-controller.service';
import { LocatorDialogComponent } from '../../_common/shop-locator/locator-dialog/locator-dialog.component';
import { MethodPickerComponent } from '../../_common/method-picker/method-picker.component';
import { ResetFavoriteAction } from '../../_store/actions/favourite.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title: string = 'Pizza Magic';
  isDarkTheme: Observable<boolean>;
  logo: string = '/assets/img/pizzamagic-white.png';

  user: PizzaMagicUser;
  shoppingCart: Observable<MenuItem[]>;
  basketTotal: number = 0;
  shop$: Observable<PizzaMagicShop>;
  currentPostcode$: Observable<string>;
  currentFulfillmentMethod$: Observable<string>;

  constructor(private userService: UserService,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
    public dialog: MatDialog,
    private storageController: StorageControllerService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
        'magic',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/magic.svg'));
     }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.user = user);
    this.shop$ = this.store.select(store => store.favourite.shop);
    this.currentPostcode$ = this.store.select(store => store.favourite.address ? store.favourite.address.postcode : '');
    this.currentFulfillmentMethod$ = this.store.select(store => store.favourite.fulfillment_method ? store.favourite.fulfillment_method : 'delivery');


    this.shoppingCart = this.store.select(store => store.basket.list);
    this.shoppingCart.subscribe(shopping => {
      this.basketTotal = 0;
      if (shopping && shopping.length > 0) {
        shopping.forEach(item => {
          this.basketTotal = this.basketTotal + item.quantity
        });
      }
    })
    // verify validity of basket
    this.storageController.verifyBasketValidity();
  }

  logout(): void {
    this.authService.logout().subscribe(
      () => {
        this.userService.resetUser();
        this.resetFavStore();
        this.router.navigateByUrl('login');
      }
    );
  }

  resetFavStore(): void {
    // reset store
    this.store.dispatch(new ResetFavoriteAction());
  }

  updateShop(): void {
    this.dialog.open(LocatorDialogComponent);
  }

  updateMethod(): void {
    this.dialog.open(MethodPickerComponent, {
      width: '300px'
    });
  }

  getCurrentRoute(): string {
    return this.router.url;
  }

}
