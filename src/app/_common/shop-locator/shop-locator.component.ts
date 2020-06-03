import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../_services/shop.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../_store/models/app-state';
import { ShopLocation, PizzaMagicShop } from '../../_interfaces/pizza-magic.shop';
import { SetFavouriteShopAction } from '../../_store/actions/favourite.actions';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-locator',
  templateUrl: './shop-locator.component.html',
  styleUrls: ['./shop-locator.component.scss']
})
export class ShopLocatorComponent implements OnInit {


  postcodeCtrl = new FormControl('', [Validators.required, Validators.pattern(/([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/)]);
  shops: PizzaMagicShop[];
  shopsLocation: ShopLocation[];
  shop: Observable<PizzaMagicShop>;

  position: any;
  returnUrl: string;
  
  constructor(private shopService: ShopService,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.shop = this.store.select(store => store.favourite.shop);
    this.shopService.getAllShops().subscribe(shops => this.shops = shops);
  }


  locateShop() {
    if (this.postcodeCtrl.valid) {
      this.shopsLocation = [];
      const postcode = this.postcodeCtrl.value;
      this.shopService.findAddressByPostcode(postcode).subscribe(response => {
        if (response && response['status'] === 200) {
          this.shopsLocation = this.shopService.locate(response['result'].latitude, response['result'].longitude);
        }
      })
    }
  }

  onPress(event: any): void {
    if (event.keyCode === 13) {
      this.locateShop();
    }
  }

  getLocation() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    } 
  }

  setPosition(position) {
    this.shopsLocation = [];
    this.shopsLocation = this.shopService.locate(position.coords.latitude, position.coords.longitude);
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
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '';
    this.router.navigateByUrl(this.returnUrl);
  }

}
