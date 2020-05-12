import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

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

  constructor(
    public dialogRef: MatDialogRef<OrderDComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderData) { }

  ngOnInit() {
    this.preselectD();
    this.totalPrice = this.data.d.price;
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