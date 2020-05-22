import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PizzaMagicShop, ShopLocation } from '../_interfaces/pizza-magic.shop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopLocatorService {

  shops: PizzaMagicShop[] = [
    {
      name: 'Heswall',
      postcode: 'CH60 0AG',
      address: 'Pizza Magic, 62 Telegraph Road, Heswall, Wirral, England',
      longitude: -3.09219,
      latitude: 53.325727
    },
    {
      name: 'West Kirby',
      postcode: 'CH48 0RF',
      address: 'Pizza Magic, 134 Banks Road, West Kirby, Wirral, England',
      longitude: -3.183624,
      latitude: 53.368929
    }
  ];

  constructor(private http: HttpClient) { }


  findAddressByPostcode(postcode): Observable<any> {
    // const apiURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${environment.google.apiKey}`;
    // return this.http.get(apiURL).pipe(map(res => console.log(res)))
    const apiUrl = `http://api.postcodes.io/postcodes/${this.trim(postcode)}`;
    return this.http.get(apiUrl);
  }

  locate(latitude: number, longitude: number): ShopLocation[] {
    let shopsLocator: ShopLocation[] = [];
  
    this.shops.forEach(shop => {
      let distance = this.distance(shop.latitude, shop.longitude, latitude, longitude);
      shopsLocator.push({
        name: shop.name,
        postcode: shop.postcode,
        address: shop.address,
        distance: distance
      })
    });

    return shopsLocator;
  }

  trim(val: string): string {
    return val.replace(/\ /g, '');
  }

  roundToDecimal(number: number): number {
    return Math.round(number * 10) / 10;
  }

  distance(lat1: number, lon1: number, lat2: number, lon2: number, unit?: string) {
    // unit is automaticall miles 
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return this.roundToDecimal(dist);
    }
  }
}
