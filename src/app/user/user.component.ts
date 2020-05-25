import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User, UserPreferences } from '../_interfaces/user';
import { Observable, forkJoin } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../_store/models/app-state';
import { ColorSchemeService } from '../core/services/color-scheme.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopLocatorService } from '../_services/shop-locator.service';
import { PizzaMagicShop } from '../_interfaces/pizza-magic.shop';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User;
  userForm: FormGroup;
  preferencesForm: FormGroup;
  panelOpenState = false;
  isDarkTheme: Observable<boolean>;
  colorSheme: string;
  preferences: UserPreferences;
  shops: PizzaMagicShop[];
  editMode: boolean = false;
  
  constructor(private userService: UserService,
    private colorSchemeService: ColorSchemeService,
    private formBuilder: FormBuilder,
    private shopService: ShopLocatorService,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.isDarkTheme = this.colorSchemeService.isDarkTheme;
    
    this.userService.getUser().subscribe(user => {
      this.user = user;
      if (user) this.createUserForm(user);
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
        fulfillment_method: userPreferences.fulfillment_method
      }
      this.createPrefForm(this.preferences);
    })
  }

  toggleDarkTheme(checked: boolean) {
    this.colorSchemeService.setDarkTheme(checked);
    
  }

  createUserForm(user: User): void {
    this.userForm = this.formBuilder.group({
      name: [user.name, Validators.required],
      surname: [user.surname, Validators.required],
      email: [user.email, [Validators.required,
      Validators.email]],
      phone: [user.phone, Validators.required],
      postcode: [user.postcode, Validators.required],
      address: [user.address, Validators.required]
    });
    this.userForm.disable();
  }

  createPrefForm(preferences: UserPreferences): void {
    this.preferencesForm = this.formBuilder.group({
      favourite_shop: [preferences.favourite_shop],
      fulfillment_method: [preferences.fulfillment_method]
    });
    this.preferencesForm.disable();
  }
  
  editProfile(): void {
    if (!this.editMode) {
      this.userForm.enable();
      this.preferencesForm.enable();
      this.editMode = true;
    }
    else { this.saveChanges() }
  }

  saveChanges(): void {
    console.log(this.userForm.value);
    this.userForm.disable();
    this.preferencesForm.disable();
    this.editMode = false;
  }
  

}
