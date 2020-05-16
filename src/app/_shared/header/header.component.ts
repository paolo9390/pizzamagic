import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../_services/user.service';
import { PizzaMagicUser } from '../../_interfaces/user';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from '../../_store/models/app-state';
import { ShoppingItem } from 'src/app/_store/models/shopping-item';

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

  shoppingCart: Observable<ShoppingItem[]>;
  basketTotal: number = 0;

  constructor(private userService: UserService,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
        'magic',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/magic.svg'));
     }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.user = user);

    this.shoppingCart = this.store.select(store => store.shopping);
    this.shoppingCart.subscribe(shopping => {
      if (shopping && shopping.length > 0) {
        this.basketTotal = 0;
        shopping.forEach(item => {
          this.basketTotal = this.basketTotal + item.amount
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

}
