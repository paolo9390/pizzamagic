import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { ShopService } from '../../_services/shop.service';
import { forkJoin, Observable, observable } from 'rxjs';
import { UserPreferences, User, Address, PizzaMagicUser } from '../../_interfaces/user';
import { PizzaMagicShop, ShopInfo } from '../../_interfaces/pizza-magic.shop';
import { ConfigureAddressComponent } from '../../user/configure-address/configure-address.component';
import { MatDialog } from '@angular/material';
import { AppState } from '../../_store/models/app-state';
import { Store } from '@ngrx/store';
import { FavouriteState } from '../../_store/models/favourite';
import { SetFavouriteShopAction } from '../../_store/actions/favourite.actions';
import { GeneralInfoComponent } from '../../_common/general-info/general-info.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  // user vars
  user: User;
  user$: Observable<PizzaMagicUser>;
  isUserLoggedIn: boolean;
  userDistance: number; // in miles

  // preferences vars 
  preferences: UserPreferences;
  selectedPreferredMethod: string;

  // address vars 
  addressBook: Address[];
  selectedAddress: Address;

  // shop vars 
  shops: PizzaMagicShop[];
  selectedShop: PizzaMagicShop;
  shopInfo: ShopInfo;
  isShopClosed: boolean = false;


  // favorite state
  favorite$: Observable<FavouriteState>;
  favoriteMethod: string;
  favoriteAddress: Address;
  favoriteShop: PizzaMagicShop;


  // other vars 
  isEditAddress: boolean = false;
  isEditShop: boolean = false;
  defaultMethod: string = 'delivery';

  weekDays: string [] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  constructor(private userService: UserService,
    private dialog: MatDialog,
    private shopService: ShopService,
    private store: Store<AppState>) { }

  ngOnInit() {
    // get preselected favorites
    this.favorite$ = this.store.select(store => store.favourite);
    this.favorite$.subscribe(favorite => {
      if (favorite && favorite.fulfillment_method) this.favoriteMethod = favorite.fulfillment_method;
      if (favorite && favorite.address) this.favoriteAddress = favorite.address;
      if (favorite && favorite.shop) this.favoriteShop = favorite.shop;
    });

    // get user 
    this.user$ = this.userService.currentUser;
    this.user$.subscribe(userLoggedIn => {
      if (userLoggedIn) {
        this.getUserPreferences();
      }
    })

  }

  // user functions
  getUserPreferences(): void {
    const shops$ = this.shopService.getAllShops();
    const userPreferences$ = this.userService.getUserPreferences();
    const userAddressBook$ = this.userService.getAddressBook();


    forkJoin(userPreferences$, userAddressBook$, shops$).subscribe(objects => {

      const userPreferences: UserPreferences = objects[0];
      // assign shops from observable 
      this.shops = objects[2];

      if (userPreferences) {
        const shop = userPreferences.favourite_shop ? this.shops.find(({ name }) => name === userPreferences.favourite_shop.name) : null;
        // assigning preferences from obs
        if (shop || userPreferences.fulfillment_method || userPreferences.favourite_address) {
          this.preferences = {
            favourite_shop: shop,
            fulfillment_method: userPreferences.fulfillment_method,
            favourite_address: userPreferences.favourite_address
          }
          this.selectedPreferredMethod = this.preferences.fulfillment_method;
        }
      }
      

      // check if a shop was pre-selected  
      if (this.favoriteShop) {
        this.selectedShop = this.shops.find(({ name }) => name === this.favoriteShop.name);
        this.validateOpeningHours();
      }

      
      // check if the current chose address is avaliable from the addressBook
      const userAddressBook: Address[] = objects[1];
      if (userAddressBook && userAddressBook.length > 0) {
        this.addressBook = userAddressBook;
        userAddressBook.forEach(address => {
          if (address.postcode.toUpperCase() === this.favoriteAddress.postcode.toUpperCase()) {
            this.selectAddress(address);
          }
        });
        // if the current postcode isnt found in the address book of the user make user create a new address 
        if (!this.selectedAddress) this.editAddress();
      } else {
        this.selectAddress(this.favoriteAddress);
      }
    })
  }


  // shop functions
  selectShop(shop: PizzaMagicShop): void {
    this.selectedShop = shop;
    this.isEditShop = false;
    this.store.dispatch(new SetFavouriteShopAction(shop));
    this.verifyDistance();
    this.validateOpeningHours();
  }

  editShop(): void {
    this.isEditShop = true;
  }


  // address functions
  getAddressBook(): void {
    this.userService.getAddressBook().subscribe(addressBook => {
      if (addressBook && addressBook.length > 0) {
        this.addressBook = addressBook;
        this.selectAddress(addressBook[addressBook.length-1])
      }
    })
  }

  selectAddress(address: Address): void {
    this.selectedAddress = address;
    this.isEditAddress = false;
    this.verifyDistance();
  }

  verifyDistance(): void {
    this.shopService.findAddressByPostcode(this.selectedAddress.postcode).subscribe(response => {
      if (response && response['status'] === 200) {
        this.userDistance = this.shopService.getDistanceByLatLonShop(this.selectedShop, response['result'].latitude, response['result'].longitude);
      }
    })
  }

  validateOpeningHours(): void {
    this.isShopClosed = false;
    const currentDate = new Date();
    const currentDay: string = this.weekDays[currentDate.getDay()];
    const currentMinutes: string = currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : `${currentDate.getMinutes()}`
    const currentTime: string = `${currentDate.getHours()}${currentMinutes}`

    for (let day of this.selectedShop.opening_hours) {
      if (currentDay in day) {
        const openingHours: string = day[currentDay].open;
        const closingHours: string = day[currentDay].close;
        if (parseInt(currentTime) > parseInt(openingHours) && parseInt(currentTime) < parseInt(closingHours)) {}
        else this.showShopClosed();
      }
    }
  }

  showShopClosed(): void {
    this.isShopClosed = true;

    this.dialog.open(GeneralInfoComponent, {
      data: {
        title: this.selectedShop.name,
        icon: 'store',
        description: `Sorry, the ${this.selectedShop.name} branch is closed at this moment.`
      },
    });
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
