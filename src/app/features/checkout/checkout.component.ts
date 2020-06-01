import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { ShopLocatorService } from '../../_services/shop-locator.service';
import { forkJoin, Observable } from 'rxjs';
import { UserPreferences, User, Address, PizzaMagicUser } from '../../_interfaces/user';
import { PizzaMagicShop, ShopInfo } from '../../_interfaces/pizza-magic.shop';
import { ConfigureAddressComponent } from 'src/app/user/configure-address/configure-address.component';
import { MatDialog } from '@angular/material';
import { AppState } from 'src/app/_store/models/app-state';
import { Store } from '@ngrx/store';
import { FavouriteState } from 'src/app/_store/models/favourite';

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


  shopInfo: ShopInfo;
  favorite$: Observable<FavouriteState>;
  favoriteMethod: string;
  favoriteShop: PizzaMagicShop;
  favoriteAddress: Address;



  user: User;
  user$: Observable<PizzaMagicUser>;
  isUserLoggedIn: boolean;
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
    private shopService: ShopLocatorService,
    private store: Store<AppState>) { }

  ngOnInit() {
    // get user 
    this.user$ = this.userService.currentUser;

    this.user$.subscribe(userLoggedIn => {

      if (userLoggedIn) {
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
    })
    
    this.favorite$ = this.store.select(store => store.favourite);
    this.favorite$.subscribe(favorite => {
      if (favorite && favorite.fulfillment_method) this.favoriteMethod = favorite.fulfillment_method;
      if (favorite && favorite.shop) this.favoriteShop = favorite.shop;
      if (favorite && favorite.address) this.favoriteAddress = favorite.address;
    });
    

  }

  getShopInfo(shop_id: number): void {
    this.shopService.getShopInfoById(shop_id).subscribe(shopInfo => this.shopInfo = shopInfo)
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
