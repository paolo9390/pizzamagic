import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { ShopService } from '../../_services/shop.service';
import { forkJoin, Observable, observable } from 'rxjs';
import { UserPreferences, User, Address, PizzaMagicUser } from '../../_interfaces/user';
import { PizzaMagicShop, ShopInfo } from '../../_interfaces/pizza-magic.shop';
import { ConfigureAddressComponent } from 'src/app/user/configure-address/configure-address.component';
import { MatDialog } from '@angular/material';
import { AppState } from 'src/app/_store/models/app-state';
import { Store } from '@ngrx/store';
import { FavouriteState } from 'src/app/_store/models/favourite';
import { SetFavouriteShopAction } from 'src/app/_store/actions/favourite.actions';

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
  favorite$: Observable<FavouriteState>;
  favoriteMethod: string;
  selectedFavouriteMethod: string;

  // address vars 
  addressBook: Address[];
  favoriteAddress: Address;
  selectedAddress: Address;

  // shop vars 
  shops: PizzaMagicShop[];
  selectedShop: PizzaMagicShop;
  shopInfo: ShopInfo;
  favoriteShop: PizzaMagicShop;


  // other vars 
  isEditAddress: boolean = false;
  isEditShop: boolean = false;
  preferredMethod: string = 'delivery';

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
        this.getAddressBook();
        this.getUserPreferences();
      }
    })

  }

  // user functions
  getUserPreferences(): void {
    const shopObs = this.shopService.getAllShops();
    const userPreferenceObs = this.userService.getUserPreferences();
    forkJoin(userPreferenceObs, shopObs).subscribe(objects => {

      const userPreferences: UserPreferences = objects[0];

      // assign shops from observable 
      this.shops = objects[1];

      // check if a shop was pre-selected  
      if (this.favoriteShop) {
        this.selectedShop = this.shops.find(({ name }) => name === this.favoriteShop.name);
      }
      const shop = this.shops.find(({ name }) => name === userPreferences.favourite_shop.name);

      // assigning preferences from obs
      this.preferences = {
        favourite_shop: shop,
        fulfillment_method: userPreferences.fulfillment_method,
        favourite_address: userPreferences.favourite_address
      }

      if (userPreferences && userPreferences.favourite_address) {
        this.selectAddress(userPreferences.favourite_address);
      }
    })
  }


  // shop functions
  selectShop(shop: PizzaMagicShop): void {
    this.selectedShop = shop;
    this.isEditShop = false;
    this.store.dispatch(new SetFavouriteShopAction(shop));
    this.verifyDistance();
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
