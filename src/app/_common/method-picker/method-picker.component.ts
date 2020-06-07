import { Component, OnInit } from '@angular/core';
import { PizzaMagicShop } from '../../_interfaces/pizza-magic.shop';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/_store/models/app-state';
import { MatDialogRef } from '@angular/material';
import { SetFavouriteMethodAction } from 'src/app/_store/actions/favourite.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-method-picker',
  templateUrl: './method-picker.component.html',
  styleUrls: ['./method-picker.component.scss']
})
export class MethodPickerComponent implements OnInit {

  shops: PizzaMagicShop[] = [];
  fulfillmentMethods: string[] = ['delivery', 'collection'];
  currentFulfillmentMethod$: Observable<string>;
  fulfillmentMethod: string;

  constructor(
    public dialogRef: MatDialogRef<MethodPickerComponent>,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.currentFulfillmentMethod$ = this.store.select(store => store.favourite.fulfillment_method ? store.favourite.fulfillment_method : '');
    this.currentFulfillmentMethod$.subscribe(method => this.fulfillmentMethod = method);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateOnClick(): void {
    this.store.dispatch(new SetFavouriteMethodAction(this.fulfillmentMethod));
    this.dialogRef.close();
  }
}
