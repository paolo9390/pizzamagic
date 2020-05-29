import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { PizzaMagicUser, Address } from '../_interfaces/user';
import { UserService } from '../_services/user.service';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from '../_store/models/app-state';
import { PizzaMagicShop } from '../_interfaces/pizza-magic.shop';
import { SetFavouriteShopAction, SetFavouriteAddressAction, SetFavouriteMethodAction } from '../_store/actions/favourite.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  title: string = 'Login to ORDER NOW';
  loginForm: FormGroup;
  registerForm: FormGroup;
  isSubmitted = false;
  hide = true;
  authErr: string;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private store: Store<AppState>,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      email: ['', [Validators.required,
      Validators.email]],
      password: ['', Validators.required]
    });

    this.authErr = '';

    this.registerForm  =  this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required,
      Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  login() {
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      res => {
        if (res) {
          const pmUser: PizzaMagicUser = {
            email: res.user.email,
            token: res.token,
            name: res.user.name.split(' ')[0]
          };
          this.userService.setUserValue(pmUser);
          this.setUserPreferences();
        }
        this.router.navigateByUrl('/home');
      },
      err => {
        console.error(err);
        this.authErr = err.error.error;
        this.openSnackBar(this.authErr, 'ok');
      }
    );
  }

  register() {
    if(this.registerForm.invalid){
      return;
    }

    this.authService.register(this.registerForm.value).subscribe(
      res => {
        if (res) {
          const pmUser: PizzaMagicUser = {
            email: res.user.email,
            token: res.token,
            name: res.user.name.split(' ')[0]
          };
          this.userService.setUserValue(pmUser);
          this.setUserPreferences();
        }
        this.router.navigateByUrl('/home');
      },
      err => {
        console.error(err);
        this.authErr = err.error.error;
        this.openSnackBar(this.authErr, 'ok');
      }
    );
  }

  selectShop(shop: PizzaMagicShop) {
    this.store.dispatch(new SetFavouriteShopAction(shop));
  }

  selectAddress(address: Address) {
    this.store.dispatch(new SetFavouriteAddressAction(address));
  }

  selectFulfillmentMethod(method: string) {
    this.store.dispatch(new SetFavouriteMethodAction(method));
  }

  // set user preferences at login if any are found
  setUserPreferences(): void {
    this.userService.getUserPreferences().subscribe(pref => {
      if (pref) {
        this.selectShop(pref.favourite_shop)
        this.selectAddress(pref.favourite_address);
        this.selectFulfillmentMethod(pref.fulfillment_method);
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  getErrorMessage() {
    if (this.loginForm.controls.email.hasError('required')) {
      return 'You must enter a valid email address';
    }

    return this.loginForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }
}
