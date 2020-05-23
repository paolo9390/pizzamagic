import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Pizza, PizzaBase, Topping, PizzaSize } from '../../../_interfaces/pizza';
import { Store } from '@ngrx/store';
import { AppState } from '../../../_store/models/app-state';
import { AddItemAction } from '../../../_store/actions/shopping.actions';
import { ShoppingItem, Product } from '../../../_store/models/shopping';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

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
  crusts: PizzaBase[] = [];

  sizeSelected: PizzaSize;
  crustSelected: PizzaBase;
  basesSelected: PizzaBase[] = [];

  optionsSelected: string[] = [];
  extraToppings: Topping[] = [];
  pizzaPrice: number = 0;
  totalPrice: number = 0;
  numberOfItems: number = 1;

  sizeFormGroup: FormGroup;
  crustFormControl = new FormControl('', []);


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
      description: this.crustSelected ? this.crustSelected.title : this.sizeSelected.type,
      notes: '',
      extras: extras,
      optional: this.optionsSelected
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

  updateCrust(evt: any): void {
    const crust: PizzaBase = evt.value;
    this.crustSelected = crust;
    this.calculateTotal();
  }

  resetCrust(): void {
    this.crustSelected = null;
    this.crustFormControl.reset();
    this.calculateTotal();
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

  addOption(evt: any): void {
    const option: string = evt.source.value;
    if (evt.checked) {
      this.optionsSelected.push(option);
      if (option.includes('base')) this.defaultSauce = {
        name: this.keying(option),
        title: option
      }
    } else {
      const index = this.optionsSelected.indexOf(option);
      if (index > -1) {
        this.optionsSelected.splice(index, 1);
        if (option.includes('base')) this.resetDefaultSauce();
      }
    }
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
    let crustTotal: number = 0;

    // check all bases additions
    this.basesSelected.forEach(base => {
      basesTotal = basesTotal + base.price
    });
    // check all toppings additions
    this.extraToppings.forEach(() => {
      extraTotal = extraTotal + this.sizeSelected.price_per_topping
    });
    // any modified crust total
    crustTotal = this.crustSelected ? this.crustSelected.price : 0; 
    // add all to total
    this.totalPrice = this.pizzaPrice + crustTotal + extraTotal + basesTotal;
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
    this.crusts = [];

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

    // add other crusts to options
    this.data.crusts.forEach(crust => {
      // check if the sauce crusts are allowed on that crust type before adding them to array
      for (var type of crust.for) {
        if (type === this.sizeSelected.type) this.crusts.push(crust);
      }
    });

    this.checkCrustCompatibility();
  }

  checkCrustCompatibility() {
    if (this.crustSelected) {
      // ie calzone on deep pan is wrong 
      for (var type of this.crustSelected.for) {
        if (type !== this.sizeSelected.type) this.resetCrust();
      }
    }
  }

  trim(val: string): string {
    return val.replace(/\_/g, ' ');
  }


  keying(val: string): string {
    return val.replace(/\ /g, '_');
  }

}

export interface OrderPizzaData {
  pizza: Pizza;
  crusts: PizzaBase[];
  bases: PizzaBase[];
  sizes: PizzaSize[];
  toppings: Topping[];
}