import { Component, OnInit, Inject } from '@angular/core';
import { Topping } from '../../_interfaces/pizza';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Dip } from '../../_interfaces/side-order';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.scss']
})
export class OrderProductComponent implements OnInit {


  img: string = '/assets/img/pizzas/pizza.jpg'
  sizeSelected: PriceSize;
  extraDips: Dip[] = [];
  totalPrice: number = 0;

  constructor(
    public dialogRef: MatDialogRef<OrderProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderData) { }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectSize(evt: any): void {
    this.sizeSelected = evt.value;
    this.calculateTotal();
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
    this.totalPrice = this.sizeSelected.price + extraTotal;
  }
}


export interface OrderData {
  product?: AnyProduct;
  toppings?: Topping[];
  dips?: Dip[];
}

export interface AnyProduct {
  name: string;
  title: string;
  description?: string;
  toppings?: string[];
  price_size?: PriceSize[];
  spicy?: boolean;
}

export interface PriceSize {
  size: string;
  price: number;
  description?: string;
}