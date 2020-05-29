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

  resetUser(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('pizzamagic-user');
    this.user$ = undefined;
    this.preferences$ = undefined;
  }

  getUser(): Observable<User> {
    if (!this.user$) {
      this.user$ = this.http.get<User>(`${globals.HTTP_API_URL}/user/me`).pipe(
        shareReplay(1)
      )
    }
    return this.user$;
  }

  getUserPreferences(): Observable<UserPreferences> {
    if (!this.preferences$) {
      this.preferences$ = this.http.get<UserPreferences>(`${globals.HTTP_API_URL}/favourites`).pipe(
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
    return this.http.put<UserPreferences>(`${globals.HTTP_API_URL}/favourites/`, body);
  }

  updateFavourite(shop_id: string, fulfillment_method: string, address_id: string, fav_id: string): Observable<UserPreferences> {
    const body = { shop_id: shop_id, fulfillment_method: fulfillment_method, address_id: address_id}
    return this.http.patch<UserPreferences>(`${globals.HTTP_API_URL}/favourites/${fav_id}`, body);
  }

  getAddressBook(): Observable<Address[]> {
    return this.http.get<Address[]>(`${globals.HTTP_API_URL}/favourites/address-book`)
  }

  addAddress(address: Address): Observable<Address> {
    return this.http.put<Address>(`${globals.HTTP_API_URL}/favourites/address-book`, address);
  }

  updateAddress(address: Address, address_id: string): Observable<Address> {
    return this.http.patch<Address>(`${globals.HTTP_API_URL}/favourites/address-book/${address_id}`, address);
  }

  deleteAddress(address_id: string): Observable<any> {
    return this.http.delete<any>(`${globals.HTTP_API_URL}/favourites/address-book/${address_id}`);
  }
}
