import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../_services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../_store/models/app-state';
import { ConfigureAddressComponent } from '../../../user/configure-address/configure-address.component';
import { MatDialog } from '@angular/material';
import { Address } from '../../../_interfaces/user';
import { combineLatest } from 'rxjs';
import { SetFavouriteAddressAction } from 'src/app/_store/actions/favourite.actions';

@Component({
  selector: 'checkout-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  addressBook: Address[];
  selectedAddress: Address;
  favoriteAddress: Address;
  isEditAddress: boolean;

  constructor(private userService: UserService,
    public dialog: MatDialog,
    private store: Store<AppState>) { }

  ngOnInit() {
    combineLatest(this.store.select(store => store.favourite),
    this.userService.getAddressBook()).subscribe(
      ([favorite, addressBook]: any) => {
        this.addressBook = addressBook;
        if (favorite && favorite.address) this.favoriteAddress = favorite.address;
  
        addressBook.forEach(address => {
          if (address.postcode.toUpperCase() === favorite.address.postcode.toUpperCase()) {
            this.selectedAddress = address;
          }  else {
            this.selectedAddress = this.favoriteAddress;
          }
        });
      }
    );
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
    this.store.dispatch(new SetFavouriteAddressAction(address));
  }
}
