import { Topping } from './pizza';
import { Dip } from './side-order';
import { FormControl } from '@angular/forms';

export interface MealDeal {
    _id: number;
    name: string;
    title: string;
    description: string;
    popular: boolean;
    price: number;
    availability: Availability;
    items: Item[];
    img?: string;
}

export interface MenuMealDeal {
    mealDeals: MealDeal[];
    toppings: Topping[];
    dips: Dip[];
}

export interface Availability {
    methods: string[];
    days: string[];
}

export interface Item {
    type: string;
    menu_item_id: number;
    name: string;
    title: string;
    description: string;
    modifiable: boolean;
    question_title?: string;
    question_description?: string;
    sizes_available: string[];
    options: Option[];
    formControl?: FormControl;
}

export interface Option {
    type: string;
    quantity: number;
    extra_price: number;
}