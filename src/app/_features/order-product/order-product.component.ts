import { Component, OnInit, Inject } from '@angular/core';
import { Topping } from '../../_interfaces/pizza';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Dip } from '../../_interfaces/side-order';
import { Store } from '@ngrx/store';
import { AppState } from '../../_store/models/app-state';
import { AddItemAction } from '../../_store/actions/basket.actions';
import { MenuItem, ProductModifier } from '../../_store/models/basket';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.scss']
})
export class OrderProductComponent implements OnInit {


  img: string = '/assets/img/pizzas/pizza.jpg'
  sizeSelected: PriceSize;
  extraDips: Dip[] = [];
  extraSelected: string = '';
  totalPrice: number = 0;
  numberOfItems: number = 1;


  constructor(
    public dialogRef: MatDialogRef<OrderProductComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: OrderData) { }

  ngOnInit() {
  }

  onAddClick(): void {
    this.store.dispatch(new AddItemAction(this.initializeMenuItem()));

    this.dialogRef.close();
  }

  initializeMenuItem(): MenuItem {
    let extras: ProductModifier[] = [];
    
    this.extraDips.forEach(dip => {
      extras.push({
        name: dip.name,
        description: dip.title,
        quantity: 1,
        top_level: false
      })
    });
    const item: MenuItem = {
      menu_item_id: this.data.product._id,
      name: this.data.product.name,
      title: `${this.data.product.title} ${this.extraSelected}`,
      description: this.sizeSelected.size,
      quantity: this.numberOfItems,
      price: this.totalPrice,
      type: this.data.type,
      top_level: true,
      notes: '',
      product_modifier: extras
    }
    return item;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectSize(evt: any): void {
    this.sizeSelected = evt.value;
    this.calculateTotal();
  } 

  selectIncludedExtra(evt: any): void {
    this.extraSelected = evt.value;
  }

  addExtras(evt: any): void {
    const dip: Dip = evt.source.value;
    if (evt.checked) {
      this.extraDips.push(dip);
    } else {
      const index = this.extraDips.indexOf(dip);
      if (index > -1) {
        this.extraDips.splice(index, 1);
      }
    }
    this.calculateTotal();
  }

  calculateTotal(): void {
    let extraTotal: number = 0;

    // check all toppings additions
    this.extraDips.forEach(dip => {
      extraTotal = extraTotal + dip.price
    });
    
    // add all to total
    this.totalPrice = Math.round((((this.sizeSelected.price + extraTotal) * this.numberOfItems) + Number.EPSILON) * 100) / 100;
  }

  add(): void {
    if (this.numberOfItems < 10) this.numberOfItems++;
    this.calculateTotal();
  }

  remove(): void {
    if (this.numberOfItems > 1) this.numberOfItems--;
    this.calculateTotal();
  }
}


export interface OrderData {
  product?: AnyProduct;
  toppings?: Topping[];
  dips?: Dip[];
  type: string;
}

export interface AnyProduct {
  _id: number;
  name: string;
  title: string;
  description?: string;
  toppings?: string[];
  price_size?: PriceSize[];
  spicy?: boolean;
  extras?: string[];
}

export interface PriceSize {
  size: string;
  price: number;
  description?: string;
}