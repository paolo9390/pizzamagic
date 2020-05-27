import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { ShopLocatorService } from '../../_services/shop-locator.service';
import { forkJoin } from 'rxjs';
import { UserPreferences, User, Address } from '../../_interfaces/user';
import { PizzaMagicShop } from '../../_interfaces/pizza-magic.shop';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {


  user: User;
  preferences: UserPreferences;
  shops: PizzaMagicShop[];
  selectedShop: PizzaMagicShop;
  selectedAddress: Address;
  selectedFavouriteMethod: string;
  isEditAddress: boolean = false;

  preferredMethod: string = 'delivery';

  constructor(private userService: UserService,
    private shopService: ShopLocatorService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      this.user = user;
      this.selectedAddress = {
        address: this.user.address,
        postcode: this.user.postcode,
        phone: this.user.phone
      }
    });

    const shopObs = this.shopService.getAllShops();
    const userPreferenceObs = this.userService.getUserPreferences();
    forkJoin(userPreferenceObs, shopObs).subscribe(objects => {
      delete objects[0].favourite_shop._id;
      const userPreferences: UserPreferences = objects[0];
      this.shops = objects[1];

      const shop = this.shops.find(({ name }) => name === userPreferences.favourite_shop.name);
      this.preferences = {
        favourite_shop: shop,
        fulfillment_method: userPreferences.fulfillment_method,
        address_book: userPreferences.address_book
      }
    })
    
  }

  selectAddress(address: Address): void {
    this.selectedAddress = address;
    this.isEditAddress = false;
  }

  editAddress(): void {
    this.isEditAddress = true;
  }

}
