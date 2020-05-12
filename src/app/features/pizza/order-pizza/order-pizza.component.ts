import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Pizza, PizzaBase, Topping, PizzaSize } from '../../../_interfaces/pizza';

@Component({
  selector: 'app-order-pizza',
  templateUrl: './order-pizza.component.html',
  styleUrls: ['./order-pizza.component.scss']
})
export class OrderPizzaComponent implements OnInit {

  img: string = '/assets/img/pizzas/pizza.jpg'
  extrasDisabled: boolean = true;
  baseDisabled: boolean = true;
  defaultSauce: {
    name: string;
    title: string;
  } = null;

  step = 0;
  bases: PizzaBase[] = [];

  sizeSelected: PizzaSize;
  basesSelected: PizzaBase[] = [];
  extraToppings: Topping[] = [];
  pizzaPrice: number = 0;
  totalPrice: number = 0;


  constructor(
    public dialogRef: MatDialogRef<OrderPizzaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderPizzaData) {
    }


  ngOnInit() {
    this.resetDefaultSauce()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectSize(evt: any): void {
    this.sizeSelected = evt.value;

    if (this.data.pizza.name === 'margherita') {
      this.pizzaPrice = this.sizeSelected.margherita_price;
    } else {
      this.pizzaPrice = this.sizeSelected.price;
    }
    this.calculateTotal();
    this.resetBases();
  }

  addBase(evt: any): void {
    const base: PizzaBase = evt.source.value;
    if (evt.checked) {
      this.basesSelected.push(base);
    } else {
      const index = this.basesSelected.indexOf(base);
      if (index > -1) {
        this.basesSelected.splice(index, 1);
      }
    }
    this.calculateTotal();
  }

  addTopping(evt: any): void {
    const topping: Topping = evt.source.value;
    if (evt.checked) {
      this.extraToppings.push(topping);
    } else {
      const index = this.extraToppings.indexOf(topping);
      if (index > -1) {
        this.extraToppings.splice(index, 1);
      }
    }
    this.calculateTotal();
  }

  calculateTotal(): void {
    let extraTotal: number = 0;
    let basesTotal: number = 0;

    // check all bases additions
    this.basesSelected.forEach(base => {
      basesTotal = basesTotal + base.price
    });
    // check all toppings additions
    this.extraToppings.forEach(() => {
      extraTotal = extraTotal + this.sizeSelected.price_per_topping
    });
    // add all to total
    this.totalPrice = this.pizzaPrice + extraTotal + basesTotal;
  }
  
  resetDefaultSauce(): void {
    this.defaultSauce = {
      name: 'tomato_base',
      title: 'tomato base'
    };
    
    // set current base
    if (this.data && this.data.pizza.default_sauce) {
      this.defaultSauce = {
        name: this.data.pizza.default_sauce,
        title: this.trim(this.data.pizza.default_sauce)
      };
    }

  }

  resetBases(): void {
    // reset first
    this.bases = [];

    // add other bases to options
    this.data.bases.forEach(base => {
      // do not readd the base that is defaulted on that pizza
      if (base.name !== this.defaultSauce.name) {
        // check if the sauce bases are allowed on that crust type before adding them to array
        for (var type of base.for) {
          if (type === this.sizeSelected.type) this.bases.push(base);
        }
      } 
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    if (this.step === 0) {
      this.baseDisabled = false;
      this.extrasDisabled = false;
    }
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  trim(val: string): string {
    return val.replace(/\_/g, ' ');
  }

}

export interface OrderPizzaData {
  pizza: Pizza;
  bases: PizzaBase[];
  sizes: PizzaSize[];
  toppings: Topping[];
}