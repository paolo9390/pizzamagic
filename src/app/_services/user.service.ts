import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, PizzaMagicUser, UserPreferences, Address } from '../_interfaces/user';
import { HttpClient } from '@angular/common/http';
import * as globals from './globals.service';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: BehaviorSubject<PizzaMagicUser>;
  public currentUser: Observable<PizzaMagicUser>;

  private user$: Observable<User>;
  private preferences$: Observable<UserPreferences>;
  private addressBook$: Observable<Address[]>;


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<PizzaMagicUser>(JSON.parse(localStorage.getItem('pizzamagic-user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): PizzaMagicUser {
    return this.currentUserSubject.value;
  }

  public setUserValue(user: PizzaMagicUser): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('pizzamagic-user', JSON.stringify(user));
  }

  updateUserValue(): void {
    const userStored: PizzaMagicUser = JSON.parse(localStorage.getItem('pizzamagic-user'));
    this.user$.subscribe(user => {
      const updatedUser: PizzaMagicUser = {
        token: userStored.token,
        name: user.name,
        email: user.email
      }
      this.setUserValue(updatedUser);
    })
  }

  resetUser(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('pizzamagic-user');
    this.user$ = undefined;
    this.preferences$ = undefined;
    this.addressBook$ = undefined;
  }

  getUser(): Observable<User> {
    if (!this.user$) {
      this.user$ = this.http.get<User>(`${globals.HTTP_API_URL}/user/me`).pipe(
        shareReplay(1)
      )
    }
    return this.user$;
  }

  updateUser(name: string, surname: string, phone: string, password: string): Observable<User> {
    const body = {
      name: name, 
      surname: surname, 
      phone: phone, 
      password: password
    }
    this.user$ = this.http.patch<User>(`${globals.HTTP_API_URL}/user/me/update`, body).pipe(
      shareReplay(1)
    );
    this.updateUserValue();
    return this.user$
  }

  deleteVerifyUser(password: string): Observable<any> {
    // delete user by posting and verifying the current pass for extra security 
    const body = {
      password: password
    }
    return this.http.post<any>(`${globals.HTTP_API_URL}/user/me/delete/verify`, body);
  }

  deleteUser(): Observable<any> {
    return this.http.delete<any>(`${globals.HTTP_API_URL}/user/me/delete`);
  }

  getUserPreferences(): Observable<UserPreferences> {
    if (!this.preferences$) {
      this.preferences$ = this.http.get<UserPreferences>(`${globals.HTTP_API_URL}/preferences`).pipe(
        shareReplay(1)
      )
    }
    return this.preferences$;
  }

  saveFavourites(shop_id: string, fulfillment_method: string, address_id: string, fav_id?: string): Observable<UserPreferences> {
    this.preferences$ = undefined;
    if (fav_id) return this.updateFavourite(shop_id, fulfillment_method, address_id, fav_id);
    else return this.addFavourite(shop_id, fulfillment_method, address_id);
  }

  addFavourite(shop_id: string, fulfillment_method: string, address_id: string): Observable<UserPreferences> {
    const body = { shop_id: shop_id, fulfillment_method: fulfillment_method, address_id: address_id}
    return this.http.put<UserPreferences>(`${globals.HTTP_API_URL}/preferences/`, body);
  }

  updateFavourite(shop_id: string, fulfillment_method: string, address_id: string, fav_id: string): Observable<UserPreferences> {
    const body = { shop_id: shop_id, fulfillment_method: fulfillment_method, address_id: address_id}
    return this.http.patch<UserPreferences>(`${globals.HTTP_API_URL}/preferences/${fav_id}`, body);
  }

  getAddressBook(): Observable<Address[]> {
    if (!this.addressBook$) {
      this.addressBook$ = this.http.get<Address[]>(`${globals.HTTP_API_URL}/preferences/address-book`).pipe(
        shareReplay(1)
      )
    }
    return this.addressBook$;
  }

  addAddress(address: Address): Observable<Address> {
    this.addressBook$ = undefined;
    return this.http.put<Address>(`${globals.HTTP_API_URL}/preferences/address-book`, address);
  }

  updateAddress(address: Address, address_id: string): Observable<Address> {
    this.addressBook$ = undefined;
    return this.http.patch<Address>(`${globals.HTTP_API_URL}/preferences/address-book/${address_id}`, address);
  }

  deleteAddress(address_id: string): Observable<any> {
    this.addressBook$ = undefined;
    return this.http.delete<any>(`${globals.HTTP_API_URL}/preferences/address-book/${address_id}`);
  }
}
