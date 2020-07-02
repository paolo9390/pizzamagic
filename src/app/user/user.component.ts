import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User, UserPreferences, Address } from '../_interfaces/user';
import { Observable } from 'rxjs';
import { ColorSchemeService } from '../core/services/color-scheme.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ShopService } from '../_services/shop.service';
import { PizzaMagicShop } from '../_interfaces/pizza-magic.shop';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfigureAddressComponent } from './configure-address/configure-address.component';
import { ConfigurePreferencesComponent } from './configure-preferences/configure-preferences.component';
import { DeactivateUserComponent } from './deactivate-user/deactivate-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User;
  address_book: Address[];

  userForm: FormGroup;
  password = new FormControl('', [Validators.required]);

  editMode: boolean = false;
  errorInSaving: boolean;
  saveError: string = '';
  errorInDeactivating: boolean;
  deactivateError: string = '';

  panelOpenState = false;

  isDarkTheme: Observable<boolean>;
  colorSheme: string;

  preferences: UserPreferences;
  shops: PizzaMagicShop[];

  
  constructor(private userService: UserService,
    private colorSchemeService: ColorSchemeService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private shopService: ShopService) { }

  ngOnInit() {
    this.isDarkTheme = this.colorSchemeService.isDarkTheme;
    this.getUser();

    this.getAddressBook();
    this.getPreferences();
    this.shopService.getAllShops().subscribe(shops => this.shops = shops);
  }

  getUser(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user;
      if (user) this.createUserForm(user);
    });
  }

  updateUser(): void {
    const name = this.userForm.controls.name.value;
    const surname = this.userForm.controls.surname.value;
    const phone = this.userForm.controls.phone.value;
    const password = this.password.value;
    this.userService.updateUser(name, surname, phone, password).subscribe(user => {
      this.saveError = '';
      this.errorInSaving = false;
      this.disableForm();
      this.editMode = false;
    }, err => {
      this.errorInSaving = true;
      this.saveError = err.error.error;
    })
  }

  enableForm(): void {
    this.userForm.enable();
    this.userForm.controls.email.disable();
  }

  disableForm(): void {
    this.userForm.disable();
    this.password.reset();
  }

  editProfile(): void {
    if (!this.editMode) {
      this.enableForm();
      this.editMode = true;
    }
    else { this.saveChanges() }
  }

  saveChanges(): void {
    if (this.userForm.valid && this.password.valid) {
      this.updateUser();
    }
  }

  cancelChanges(): void {
    this.disableForm();
    this.editMode = false;
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

  deactivateAccount(): void {
    this.userService.deleteVerifyUser(this.password.value).subscribe(res => {
      this.errorInDeactivating = false;
      this.deactivateError = '';
      if (res) {
        const dialogRef = this.dialog.open(DeactivateUserComponent, {
          maxWidth: '100vw',
          panelClass: 'full-screen-dialog',
          data: {
            message: res.message,
            title: 'Are you sure?',
            icon: 'cancel_presentation',
            confirm: 'Deactivate'
          }
        });
      }
    }, err =>  {
      this.errorInDeactivating = true;
      this.deactivateError = err.error.error;
    })
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
