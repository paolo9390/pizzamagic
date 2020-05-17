import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Pizza, PizzaBase, Topping, PizzaSize } from '../../../_interfaces/pizza';
import { Store } from '@ngrx/store';
import { AppState } from '../../../_store/models/app-state';
import { AddItemAction } from '../../../_store/actions/shopping.actions';
import { ShoppingItem, Product } from '../../../_store/models/shopping-item';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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

  bases: PizzaBase[] = [];

  sizeSelected: PizzaSize;
  basesSelected: PizzaBase[] = [];
  extraToppings: Topping[] = [];
  pizzaPrice: number = 0;
  totalPrice: number = 0;
  numberOfItems: number = 1;

  sizeFormGroup: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<OrderPizzaComponent>,
    private _formBuilder: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: OrderPizzaData) {
    }


  ngOnInit() {
    this.resetDefaultSauce();
    this.createForm();
  }

  createForm(): void {
    this.sizeFormGroup = this._formBuilder.group({
      sizeCtrl: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    this.store.dispatch(new AddItemAction(this.initializeItem()));

    this.dialogRef.close();
  }

  initializeItem(): ShoppingItem {
    let extras: string[] = [];
    this.basesSelected.forEach(base => {
      extras.push(base.title)
    });
    this.extraToppings.forEach(extra => {
      extras.push(extra.title)
    });

    const product: Product = {
      name: this.data.pizza.name,
      title: `${this.sizeSelected.size}"  ${this.data.pizza.title}`,
      description: `${this.sizeSelected.type}`,
      notes: '',
      extras: extras
    }

    const shopping: ShoppingItem = {
      amount: this.numberOfItems,
      price: this.totalPrice,
      product: product,
      type: 'pizza'
    }
    return shopping;
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

    this.removeNotAvailableBasesFromTotal();
  }

  removeNotAvailableBasesFromTotal(): void {
    // ie calzone from deep pan 
    this.basesSelected.forEach(base => {
        const index = this.bases.indexOf(base);
        if (index > -1) {
        } else {
          this.basesSelected.splice(index, 1);
        }
    });
    this.calculateTotal();
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