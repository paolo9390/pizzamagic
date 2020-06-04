import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PizzaMagicShop, ShopLocation, ShopInfo } from '../_interfaces/pizza-magic.shop';
import { Observable } from 'rxjs';
import * as globals from './globals.service';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  shops$: Observable<PizzaMagicShop[]>;

  constructor(private http: HttpClient) {}

  getShops(): Observable<PizzaMagicShop[]>{
    if (!this.shops$) {
      this.shops$ = this.http.get<PizzaMagicShop[]>(`${globals.HTTP_API_URL}/shops`).pipe(
        shareReplay(1)
      )
    }
    return this.shops$;
  }

  getAllShops(): Observable<PizzaMagicShop[]>{
    if (!this.shops$) {
      this.shops$ = this.http.get<PizzaMagicShop[]>(`${globals.HTTP_API_URL}/shops/all`).pipe(
        shareReplay(1)
      )
    }
    return this.shops$;
  }

  getShopInfoById(shopId: number): Observable<ShopInfo>{
    return this.http.get<ShopInfo>(`${globals.HTTP_API_URL}/shops/${shopId}`);
  }

  findAddressByPostcode(postcode): Observable<any>{
    const apiUrl = `http://api.postcodes.io/postcodes/${this.trim(postcode)}`;
    return this.http.get(apiUrl);
  }

  locate(latitude: number, longitude: number): ShopLocation[] {
    let shopsLocator: ShopLocation[] = [];

    this.shops$.subscribe(shops => {
      shops.forEach(shop => {
        let distance = this.distance(shop.latitude, shop.longitude, latitude, longitude);
        shopsLocator.push({
          name: shop.name,
          postcode: shop.postcode,
          address: shop.address,
          distance: distance
        });
      })
    });

    return shopsLocator;
  }

  // get the distance between a shop and an address by lat and long
  getDistanceByLatLonShop(shop: PizzaMagicShop, latitude: number, longitude: number): number {
    return this.distance(shop.latitude, shop.longitude, latitude, longitude);
  }

  trim(val: string): string {
    return val.replace(/\ /g, '');
  }

  roundToDecimal(number: number): number {
    return Math.round(number * 10) / 10;
  }

  distance(lat1: number, lon1: number, lat2: number, lon2: number, unit ? : string) {
    // unit is automaticall miles 
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    } else {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist>1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") {
        dist = dist * 1.609344
      }
      if (unit == "N") {
        dist = dist * 0.8684
      }
      return this.roundToDecimal(dist);
    }
  }
}
