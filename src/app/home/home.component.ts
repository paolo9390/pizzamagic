import { Component, OnInit } from '@angular/core';
import { ShopLocatorService } from '../_services/shop-locator.service';
import { FormControl, Validators } from '@angular/forms';
import { ShopLocation, PizzaMagicShop } from '../_interfaces/pizza-magic.shop';
import { Store } from '@ngrx/store';
import { AppState } from '../_store/models/app-state';
import { Observable } from 'rxjs';
import { SetFavouriteShopAction } from '../_store/actions/favourite.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  slogan: string = 'Your favourite local Pizzeria delivered to your door';
  company: string = 'Powered by pizzamagic.co.uk';
  messageTitle: string = 'Refreshingly Fresh';
  messageImg: string = '/assets/img/home/dough.jpg'
  message: string = 'Our ingredients are all fresh and locally sourced. We use no artificial ingredients or preservatives. Our dough is freshly made daily by hand no fat or oil is added in the process.';

  cards: any[] = [
    {
      title: 'Pizzas',
      route: '/pizza',
      img: '/assets/img/home/pizzas.jpg'
    },
    {
      title: 'Meal Deals',
      route: '/deals',
      img: '/assets/img/home/deals.jpg'
    }
  ];

  postcodeCtrl = new FormControl('', [Validators.required, Validators.pattern(/([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/)]);
  shops: PizzaMagicShop[];
  shopsLocation: ShopLocation[];
  shop: Observable<PizzaMagicShop>;

  position: any;

  constructor(private shoplocator: ShopLocatorService,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.shop = this.store.select(store => store.favourite.shop);
    this.shoplocator.getAllShops().subscribe(shops => this.shops = shops);
  }


  locateShop() {
    if (this.postcodeCtrl.valid) {
      this.shopsLocation = [];
      const postcode = this.postcodeCtrl.value;
      this.shoplocator.findAddressByPostcode(postcode).subscribe(response => {
        if (response && response['status'] === 200) {
          this.shopsLocation = this.shoplocator.locate(response['result'].latitude, response['result'].longitude);
        }
      })
    }
  }

  getLocation() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    } 
  }

  setPosition(position) {
    this.shopsLocation = [];
    this.shopsLocation = this.shoplocator.locate(position.coords.latitude, position.coords.longitude);
  }

  getErrorMessage() {
    if (this.postcodeCtrl.hasError('required')) {
      return 'You must enter a postcode';
    }
    if (this.postcodeCtrl.hasError('pattern')) {
      return 'You must enter a valid postcode'
    }
  }

  selectShop(shopLocation: ShopLocation) {
    const shop = this.shops.find(s => s.name.toLowerCase() == shopLocation.name.toLowerCase());
    this.store.dispatch(new SetFavouriteShopAction(shop));
  }
}
