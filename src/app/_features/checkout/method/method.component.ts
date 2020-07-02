import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../_store/models/app-state';
import { combineLatest } from 'rxjs';
import { PizzaMagicShop, ShopFulfillmentMethod } from '../../../_interfaces/pizza-magic.shop';
import { ShopService } from '../../../_services/shop.service';
import { SetFavouriteMethodAction } from '../../../_store/actions/favourite.actions';
import { Address } from '../../../_interfaces/user';
import { MatDialog } from '@angular/material';
import { GeneralInfoComponent } from '../../../_common/general-info/general-info.component';

@Component({
  selector: 'checkout-method',
  templateUrl: './method.component.html',
  styleUrls: ['./method.component.scss']
})
export class MethodComponent implements OnInit {

  favoriteMethod: string;
  selectedMethod: ShopFulfillmentMethod;
  selectedShop: PizzaMagicShop;

  types: any = [{name: 'asap', label: 'As soon as possible'},{ name: 'custom', label: 'Select a time'}];
  selectedType: string = 'asap';
  selectedTime: string;
  times: {
    max: string;
    min: string;
  } = null;

  selectedAddress: Address;
  userDistance: number;
  addDeliveryCharge: boolean = false;


  constructor(private shopService: ShopService,
    private dialog: MatDialog,
    private store: Store<AppState>) { }

  ngOnInit() {
    combineLatest(this.store.select(store => store.favourite),
    this.shopService.getAllShops()).subscribe(
      ([favorite, shops]) => {
        if (favorite && favorite.fulfillment_method) this.favoriteMethod = favorite.fulfillment_method;
        // check if a shop was pre-selected  
        if (favorite && favorite.shop) {
          this.selectedShop = shops.find(({ name }) => name === favorite.shop.name);
        }
        // check if a method is pre-selected
        if (favorite && favorite.fulfillment_method) {
          this.selectedMethod = this.selectedShop.fulfillment_methods.find(({ name }) => name === favorite.fulfillment_method);
          this.setMethodTimes();
        }
        // check if a address was pre-selected  
        if (favorite && favorite.address) {
          this.selectedAddress = favorite.address;
          this.verifyDistance();
        }
      }
    );
  }

  selectMethod(method: ShopFulfillmentMethod): void {
    this.store.dispatch(new SetFavouriteMethodAction(method.name));
    this.selectedMethod = method;
  }

  setTime(evt: any): void {
    let hours = Number(evt.match(/^(\d+)/)[1]);
    const minutes = Number(evt.match(/:(\d+)/)[1]);
    const AMPM = evt.match(/\s(.*)$/)[1];
    if (AMPM == 'PM' && hours < 12) hours = hours + 12;
    if (AMPM == 'AM' && hours == 12) hours = hours - 12;
    let sHours = hours.toString();
    let sMinutes = minutes.toString();
    if (hours < 10) sHours = '0' + sHours;
    if (minutes < 10) sMinutes = '0' + sMinutes;
  }
  
  selectType(type: string): void {
    this.selectedType = type;
  }

  validateDistance(): void {
    if (this.userDistance < this.selectedMethod.radius) this.addDeliveryCharge = false;
    else if (this.userDistance > this.selectedMethod.radius && this.userDistance < this.selectedMethod.max_radius) this.addDeliveryCharge = true;
    else if (this.userDistance > this.selectedMethod.radius && this.userDistance > this.selectedMethod.max_radius) {
      this.deliveryUnavailable();
    }
  }

  verifyDistance(): void {
    this.shopService.findAddressByPostcode(this.selectedAddress.postcode).subscribe(response => {
      if (response && response['status'] === 200) {
        this.userDistance = this.shopService.getDistanceByLatLonShop(this.selectedShop, response['result'].latitude, response['result'].longitude);
        this.validateDistance();
      }
    })
  }

  deliveryUnavailable(): void {
    if (this.selectedAddress.address) {
      this.dialog.open(GeneralInfoComponent, {
        maxWidth: '600px',
        data: {
          title: this.selectedAddress.address,
          icon: 'maps',
          description: `Sorry, the address you have selected is outside from our delivery area. Please try a different address.`
        },
      });
    }
  }

  setMethodTimes(): void {
    let now = new Date();
    if (this.selectedMethod) {
      now = this.addMinutes(now, this.selectedMethod.non_asap_minutes);
      const currentMinutes: string = now.getMinutes() < 10 ? `0${now.getMinutes()}` : `${now.getMinutes()}`

      // use this to compare
      const currentTime: string = `${now.getHours()}${currentMinutes}`

      const openingHours: string = this.selectedMethod.times.open;
      const closingHours: string = this.selectedMethod.times.close;

      if (parseInt(currentTime) > parseInt(openingHours) && parseInt(currentTime) < parseInt(closingHours)) {
        this.times = {
          min: `${now.getHours()}:${currentMinutes}`,
          max: `${closingHours.match(/.{1,2}/g)[0]}:${closingHours.match(/.{1,2}/g)[1]}`
        }
      } else {
        this.times = {
          min: `${openingHours.match(/.{1,2}/g)[0]}:${openingHours.match(/.{1,2}/g)[1]}`,
          max: `${closingHours.match(/.{1,2}/g)[0]}:${closingHours.match(/.{1,2}/g)[1]}`
        }
      }
    }
  }

  addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
  }

}
