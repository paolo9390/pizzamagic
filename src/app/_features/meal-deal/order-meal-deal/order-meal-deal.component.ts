import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { MenuItem, ProductModifier } from '../../../_store/models/basket';
import { AddItemAction } from '../../../_store/actions/basket.actions';
import { AppState } from '../../../_store/models/app-state';
import { MealDeal, Item, Option } from '../../../_interfaces/meal-deal';
import { Topping } from '../../../_interfaces/pizza';
import { Dip } from '../../../_interfaces/side-order';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-order-meal-deal',
  templateUrl: './order-meal-deal.component.html',
  styleUrls: ['./order-meal-deal.component.scss']
})
export class OrderMealDealComponent implements OnInit {

  img: string = '/assets/img/pizzas/pizza.jpg';
  selectedItems: SelectedItem[] = [];
  items: Item[] = [];
  mealItems: MealItem[] = [];
  selectedOptions: OptionSelected[] = [];

  total: number = 0;
  extraTotal: number = 0;
  
  // main form group
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<OrderMealDealComponent>,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: OrderData) { }

  ngOnInit() {
    this.data.mealDeal.items.forEach(item => {
      if (item.modifiable) {
        item.formControl = this.createFormControl(item.sizes_available)
        this.items.push(item);
      }
    });
    this.createForm();
    this.calculateTotal();
  }

  createForm(): void {
    let groupingControl: FormGroup = new FormGroup({});
    this.items.forEach(item => {
      if (item.modifiable) {
        groupingControl[item.name] = item.formControl
      }
    })
    this.formGroup = this.formBuilder.group(groupingControl);
  }

  createFormControl(sizes: string[]): FormControl {
    return new FormControl(sizes.length === 1 ? sizes[0] : null, Validators.required);
  }

  onAddClick(): void {
    this.store.dispatch(new AddItemAction(this.initializeMenuItem()));

    this.dialogRef.close();
  }

  initializeMenuItem(): MenuItem {
    let extras: ProductModifier[] = [];
    
    this.selectedItems.forEach(item => {
      item.selected.sort((a, b) => (a.type > b.type) ? 1 : -1);
      item.selected.forEach(selection => {
        extras.push({
          name: item.item.name,
          description: `${item.item.title} - ${selection.value}`,
          quantity: 1,
          top_level: false
        })
      })
    })

    const item: MenuItem = {
      menu_item_id: this.data.mealDeal._id,
      name: this.data.mealDeal.name,
      title: this.data.mealDeal.title,
      description: '',
      quantity: 1,
      price: this.total,
      type: 'meal_deal',
      top_level: true,
      notes: '',
      product_modifier: extras
    }
    return item;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  proceed(): boolean {
    this.items.forEach(item => {
      if (item.modifiable && item.formControl) {
        if (item.formControl.invalid) return false;
      }
    })
    return true;
  }

  selectSize(evt: any, item: Item): void {
    const selection: OptionSelected = {
      type: 'crust_size',
      value: evt.source.value
    };
    this.selectedItems.forEach(itemSelected => {
      if (itemSelected.item === item) {
        let selected: OptionSelected = selection;
        itemSelected.selected.forEach(option => {
          if (option.type === selection.type) selected = option;
        })
        const index = itemSelected.selected.indexOf(selected);

        if (index > -1) {
          itemSelected.selected.splice(index, 1);
        }
      }
    })
      
    this.addToItem(item, selection, 1, 0);
  }

  addOption(evt: any, item: Item, option: Option): void {
    const selection: OptionSelected = {
      type: option.type,
      value: evt.source.value
    };

    if (evt.checked) {
      this.addToItem(item, selection, option.quantity, option.extra_price);
    } else {
      this.removeFromItem(item, selection, option.quantity, option.extra_price);
    }

    this.calculateTotal();
  }

  removeFromItem(item: Item, selection: OptionSelected, allowedQuantity: number, extraPrice: number) {
    this.selectedItems.forEach(itemSelected => {
      if (itemSelected.item === item) {
        let selected: OptionSelected = selection;
        itemSelected.selected.forEach(option => {
          if (option.type === selection.type && option.value === selection.value) selected = option;
        })
        const index = itemSelected.selected.indexOf(selected);
        if (index > -1) {
          itemSelected.selected.splice(index, 1);

          let quantityPerType = 0;
          itemSelected.selected.forEach(option => {

            if (option.type === selection.type) {
              quantityPerType ++;
            }
          });
          // if the quantity per type selected by the user is more than the allowed quantity then remove from total price
          if (quantityPerType > allowedQuantity ) this.extraTotal = this.extraTotal - extraPrice;

        }
      }
    })
  }

  addToItem(item: Item, selection: OptionSelected, allowedQuantity: number, extraPrice: number) {
    let itemAlreadyAdded: boolean = false;
    this.selectedItems.forEach(itemSelected => {
      if (itemSelected.item === item) {
        itemAlreadyAdded = true;
        itemSelected.selected.push(selection);

        let quantityPerType = 0;
        itemSelected.selected.forEach(option => {

          if (option.type === selection.type) {
            quantityPerType ++;
          }
        });
        // if the quantity per type selected by the user is more than the allowed quantity then add to total price
        // eg if a pizza is allowed 2 toppings only and customer selects 3 
        if (quantityPerType > allowedQuantity) this.extraTotal = this.extraTotal + extraPrice;
      }
    })

    if (!itemAlreadyAdded) {
      this.selectedItems.push({item: item, selected: [selection]});
      // if the quantity per type selected by the user is more than the allowed quantity then add to total price
      if (allowedQuantity === 0) this.extraTotal = this.extraTotal + extraPrice;
    }
  }

  calculateTotal(): void {
    this.total = Math.round((this.extraTotal + this.data.mealDeal.price + Number.EPSILON) * 100) / 100;
  }

  next(): void {
    document.querySelector('.mat-dialog-content').scrollTo(0,0)
  }
}

export interface OrderData {
  mealDeal: MealDeal;
  toppings: Topping[];
  dips: Dip[];
}

export interface SelectedItem {
  item: Item;
  selected: OptionSelected[];
}

export interface OptionSelected {
  itemName?: string;
  type: string;
  value: string;
  price?: number;
}

export interface MealItem {
  item: Item;
  toppings: AllowedPrice;
  cheese: AllowedPrice;
  dips: AllowedPrice;
}

export interface AllowedPrice {
  allowed: number;
  price: number;
}