import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../_services/shop.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../_store/models/app-state';
import { ShopLocation, PizzaMagicShop } from '../../_interfaces/pizza-magic.shop';
import { SetFavouriteShopAction, SetFavouriteAddressAction } from '../../_store/actions/favourite.actions';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { Address, PizzaMagicUser } from '../../_interfaces/user';

@Component({
  selector: 'app-shop-locator',
  templateUrl: './shop-locator.component.html',
  styleUrls: ['./shop-locator.component.scss']
})
export class ShopLocatorComponent implements OnInit {


  postcodeCtrl = new FormControl('', [Validators.required, Validators.pattern(/([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/)]);
  shops: PizzaMagicShop[];
  shopsLocation: ShopLocation[];
  addressBook: Address[];

  position: any;
  returnUrl: string;
  
  constructor(protected shopService: ShopService,
    protected store: Store<AppState>,
    protected router: Router,
    protected route: ActivatedRoute,
    protected userService: UserService) { }

  ngOnInit() {
    this.shopService.getAllShops().subscribe(shops => this.shops = shops);
    const user: PizzaMagicUser = this.userService.currentUserValue;
    if (user) this.userService.getAddressBook().subscribe(addressBook => this.addressBook = addressBook);
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

  onPressHome(event: any): void {
    if (event.keyCode === 13) {
      this.searchNearestShop();
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

  selectShop(shopLocation: ShopLocation): void {
    const shop = this.shops.find(s => s.name.toLowerCase() == shopLocation.name.toLowerCase());
    this.store.dispatch(new SetFavouriteShopAction(shop));
  }

  selectShopByNewAddress(shopLocation: ShopLocation): void {
    // add postcode and shop to favorite state 
    const postcode = this.postcodeCtrl.value.toUpperCase();
    const newAddress: Address = { address: '', postcode: postcode, phone: '' };
    this.selectShop(shopLocation);
    this.selectAddress(newAddress);
  }

  searchNearestShop(): void {
    if (this.postcodeCtrl.valid) {
      this.shopsLocation = [];
      const postcode = this.postcodeCtrl.value;
      this.shopService.findAddressByPostcode(postcode).subscribe(response => {
        if (response && response['status'] === 200) {
          this.shopsLocation = this.shopService.locate(response['result'].latitude, response['result'].longitude);
          let nearestShop: ShopLocation = this.shopsLocation[0];
          if (this.shopsLocation) {
            this.shopsLocation.forEach(shop => {
              if (shop.distance < nearestShop.distance) nearestShop = shop;
            });
          }
          this.selectShopByNewAddress(nearestShop);
        }
      })
    }
  }

  selectNearestShopByAddress(address: Address): void {
    this.shopService.findAddressByPostcode(address.postcode).subscribe(response => {
      if (response && response['status'] === 200) {
        this.shopsLocation = this.shopService.locate(response['result'].latitude, response['result'].longitude);
        let nearestShop: ShopLocation = this.shopsLocation[0];
        if (this.shopsLocation) {
          this.shopsLocation.forEach(shop => {
            if (shop.distance < nearestShop.distance) nearestShop = shop;
          });
          this.selectShop(nearestShop);
        }
        this.selectAddress(address);
      }
    })
  }

  selectAddress(address: Address): void {
    this.store.dispatch(new SetFavouriteAddressAction(address));
    this.redirectUser();
  }

  redirectUser(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'pizzas';
    this.router.navigateByUrl(this.returnUrl);
  }

}
