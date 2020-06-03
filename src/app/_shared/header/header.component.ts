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
import { ShopLocatorComponent } from 'src/app/_common/shop-locator/shop-locator.component';

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
  shop: Observable<PizzaMagicShop>;

  constructor(private userService: UserService,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
    public dialog: MatDialog,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
        'magic',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/magic.svg'));
     }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.user = user);
    this.shop = this.store.select(store => store.favourite.shop);

    this.shoppingCart = this.store.select(store => store.basket.list);
    this.shoppingCart.subscribe(shopping => {
      this.basketTotal = 0;
      if (shopping && shopping.length > 0) {
        shopping.forEach(item => {
          this.basketTotal = this.basketTotal + item.quantity
        });
      }
    })
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        this.router.navigateByUrl('login');
        this.userService.resetUser();
      }
    );
  }

  updateShop(): void {
    this.dialog.open(ShopLocatorComponent);
  }

}
