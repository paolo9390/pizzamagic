import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { ShopLocatorService } from '../../_services/shop-locator.service';
import { forkJoin } from 'rxjs';
import { UserPreferences, User, Address } from '../../_interfaces/user';
import { PizzaMagicShop } from '../../_interfaces/pizza-magic.shop';
import { ConfigureAddressComponent } from 'src/app/user/configure-address/configure-address.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  // objects to be loaded at first and stored
  // user (local storage)
  // preferences such as shop, delivery method and preferred address and payment method (api hit subscriber)


  // default objects  
  // delivery method 

  // what to ask for 
    // shop choice => store in preference store 






  user: User;
  preferences: UserPreferences;
  address_book: Address[];
  shops: PizzaMagicShop[];

  selectedShop: PizzaMagicShop;
  selectedAddress: Address;
  selectedFavouriteMethod: string;
  
  isEditAddress: boolean = false;

  preferredMethod: string = 'delivery';

  constructor(private userService: UserService,
    private dialog: MatDialog,
    private shopService: ShopLocatorService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      this.user = user;
    });
    this.getAddressBook();

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
        favourite_address: userPreferences.favourite_address
      }

      if (userPreferences && userPreferences.favourite_address) {
        this.selectedAddress = userPreferences.favourite_address
      } else this.selectedAddress = this.address_book[0];
    })
    
  }

  getAddressBook(): void {
    this.userService.getAddressBook().subscribe(address_book => {
      if (address_book && address_book.length > 0) {
        this.address_book = address_book;
        this.selectAddress(address_book[address_book.length-1])
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


  addAddress(): void {
    const dialogRef = this.dialog.open(ConfigureAddressComponent, {
      maxWidth: '100vw',
      panelClass: 'full-screen-dialog',
      data: {
        mode: 'add'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.getAddressBook();
    });
  }

}
