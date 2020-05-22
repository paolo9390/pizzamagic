import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AppState } from '../../../_store/models/app-state';
import { Store } from '@ngrx/store';
import { AddItemAction } from '../../../_store/actions/shopping.actions';
import { ShoppingItem, Product } from '../../../_store/models/shopping';

@Component({
  selector: 'app-order-d',
  templateUrl: './order-d.component.html',
  styleUrls: ['./order-d.component.scss']
})
export class OrderDComponent implements OnInit {


  img: string = '/assets/img/dessert-drinks/drink.jpg';
  optionSelected: string;
  dSelected: OptionSelected;
  totalPrice: number = 0;
  numberOfItems: number = 1;

  constructor(
    public dialogRef: MatDialogRef<OrderDComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: OrderData) { }

  ngOnInit() {
    this.preselectD();
    this.calculateTotal();
  }

  onAddClick(): void {
    this.store.dispatch(new AddItemAction(this.initializeItem()));
    
    this.dialogRef.close();
  }

  initializeItem(): ShoppingItem {
    const product: Product = {
      name: this.dSelected.name,
      title: this.dSelected.title,
      description: this.optionSelected,
      notes: '',
      extras: []
    }

    const shopping: ShoppingItem = {
      amount: this.numberOfItems,
      price: this.totalPrice,
      product: product,
      type: this.data.type
    }
    return shopping;
  }

  calculateTotal() {
    this.totalPrice = Math.round(((this.numberOfItems * this.data.d.price) + Number.EPSILON) * 100) / 100;
  }

  add(): void {
    if (this.numberOfItems < 10) this.numberOfItems++;
    this.calculateTotal();
  }

  remove(): void {
    if (this.numberOfItems > 1) this.numberOfItems--;
    this.calculateTotal();
  }

  preselectD(): void {
    this.optionSelected = this.data.d.options && this.data.d.options[0] ? this.data.d.options[0] : '';
    this.selectOption(this.optionSelected);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChangeOption(evt: any): void {
    const option = evt.value;
    this.selectOption(option);
  }

  selectOption(option: string): void {
    this.dSelected = {
      name: this.data.d.name,
      title: this.data.d.title,
      description: this.data.d.description,
      option: option,
      price: this.data.d.price
    }
  }
}


export interface OrderData {
  d: AnyProduct;
  type: string;
}

export interface AnyProduct {
  name: string;
  title: string;
  description?: string;
  options?: string[];
  price: number;
  spicy?: boolean;
}

export interface OptionSelected {
  name: string;
  title: string;
  description?: string;
  option: string;
  price: number;
}