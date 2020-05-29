import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { UserPreferences, Address } from '../../_interfaces/user';
import { PizzaMagicShop } from '../../_interfaces/pizza-magic.shop';

@Component({
  selector: 'app-configure-preferences',
  templateUrl: './configure-preferences.component.html',
  styleUrls: ['./configure-preferences.component.scss']
})
export class ConfigurePreferencesComponent implements OnInit {


  preferencesForm: FormGroup;
  shops: PizzaMagicShop[] = [];
  addressBook: Address[] = [];
  favId: string;

  constructor(
    public dialogRef: MatDialogRef<ConfigurePreferencesComponent>,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: PreferencesData) { }

  ngOnInit() {
    this.addressBook = this.data.addressBook ? this.data.addressBook : [];
    this.shops = this.data.shops ? this.data.shops : [];
    this.favId = this.data.preferences ? this.data.preferences._id  : '';
    this.createForm();
  }

  createForm(): void {
    const favAddress: Address = this.data.preferences ? this.data.preferences.favourite_address : null;
    const orderMethod: string = this.data.preferences ? this.data.preferences.fulfillment_method : '';
    const favShop: PizzaMagicShop = this.data.preferences ? this.data.preferences.favourite_shop : null;

    const shop: PizzaMagicShop = this.shops && favShop ? this.shops.find((pmShop) => pmShop.name === favShop.name) : null;
    const address: Address = this.addressBook && favAddress ? this.addressBook.find((book) => book.postcode === favAddress.postcode) : null;

    this.preferencesForm = this.formBuilder.group({
      address: [address, Validators.required],
      orderMethod: [orderMethod, Validators.required],
      shop: [shop, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onAddClick(): void {
    if (this.preferencesForm.valid) {
      const shopId = this.preferencesForm.controls.shop.value._id;
      const addressId = this.preferencesForm.controls.address.value._id;
      const orderMethod = this.preferencesForm.controls.orderMethod.value;
      this.userService.saveFavourites(shopId, orderMethod, addressId, this.favId).subscribe(res => {
          this.openSnackBar(`Preferences updated.`, 'ok');
          this.dialogRef.close(true);
        }, () => {
          this.openSnackBar('Your address could not be updated at this time.', 'ok');
          this.dialogRef.close(false);
        });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  trim(val: string): string {
    return val.replace(/\ /g, '');
  }

}


export interface PreferencesData {
  preferences?: UserPreferences;
  shops: PizzaMagicShop[];
  addressBook: Address[];
}