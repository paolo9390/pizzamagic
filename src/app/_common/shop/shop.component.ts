import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../_services/shop.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../_store/models/app-state';
import { PizzaMagicShop } from '../../_interfaces/pizza-magic.shop';
import { SetFavouriteShopAction } from '../../_store/actions/favourite.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  shops: PizzaMagicShop[];

  constructor(private shopService: ShopService,
    private store: Store<AppState>,
    private router: Router) { }

  ngOnInit() {
    this.shopService.getAllShops().subscribe(shops => this.shops = shops);
    this.store.select(store => store.favourite);
  }

  selectShop(shopSelected: PizzaMagicShop): void {
    const shop = this.shops.find(s => s.name.toLowerCase() == shopSelected.name.toLowerCase());
    this.store.dispatch(new SetFavouriteShopAction(shop));
    this.router.navigateByUrl('/pizzas');
  }
}
