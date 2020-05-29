import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User, UserPreferences, Address } from '../_interfaces/user';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../_store/models/app-state';
import { ColorSchemeService } from '../core/services/color-scheme.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopLocatorService } from '../_services/shop-locator.service';
import { PizzaMagicShop } from '../_interfaces/pizza-magic.shop';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfigureAddressComponent } from './configure-address/configure-address.component';
import { ConfigurePreferencesComponent } from './configure-preferences/configure-preferences.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User;
  address_book: Address[];
  userForm: FormGroup;
  panelOpenState = false;
  isDarkTheme: Observable<boolean>;
  colorSheme: string;
  preferences: UserPreferences;
  shops: PizzaMagicShop[];
  editMode: boolean = false;
  
  constructor(private userService: UserService,
    private colorSchemeService: ColorSchemeService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private shopService: ShopLocatorService,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.isDarkTheme = this.colorSchemeService.isDarkTheme;
    
    this.userService.getUser().subscribe(user => {
      this.user = user;
      if (user) this.createUserForm(user);
    });
    this.getAddressBook();
    this.getPreferences();
    this.shopService.getAllShops().subscribe(shops => this.shops = shops);
  }

  getPreferences(): void {
    this.userService.getUserPreferences().subscribe(pref => this.preferences = pref);
  }

  getAddressBook(): void {
    this.userService.getAddressBook().subscribe(address_book => {
      this.address_book = address_book;
    });
  }

  toggleDarkTheme(checked: boolean): void {
    this.colorSchemeService.setDarkTheme(checked);
  }

  createUserForm(user: User): void {
    this.userForm = this.formBuilder.group({
      name: [user.name, Validators.required],
      surname: [user.surname, Validators.required],
      email: [user.email, [Validators.required,
      Validators.email]],
      phone: [user.phone, Validators.required]
    });
    this.userForm.disable();
  }

  editProfile(): void {
    if (!this.editMode) {
      this.userForm.enable();
      this.editMode = true;
    }
    else { this.saveChanges() }
  }

  saveChanges(): void {
    this.userForm.disable();
    this.editMode = false;
  }

  updatePreferences(): void {
    const dialogRef = this.dialog.open(ConfigurePreferencesComponent, {
      maxWidth: '100vw',
      panelClass: 'full-screen-dialog',
      data: {
        preferences: this.preferences,
        addressBook: this.address_book,
        shops: this.shops
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPreferences();
      }
    });
    
  }
  
  configureAddress(mode: string, address?: Address): void {
    const dialogRef = this.dialog.open(ConfigureAddressComponent, {
      maxWidth: '100vw',
      panelClass: 'full-screen-dialog',
      data: {
        mode: mode,
        addressBook: address
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAddressBook();
      }
    });
  }

  deleteAddress(address: Address): void {
    this.userService.deleteAddress(address._id).subscribe(() => {
      this.getAddressBook();
      this.openSnackBar('Address deleted successfully.', 'ok');
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
