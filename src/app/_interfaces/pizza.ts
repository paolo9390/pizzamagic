export interface Pizza {
    _id: number;
    popular?: boolean;
    name: string;
    title: string;
    description: string;
    img?: string;
    vegan: boolean;
    vegeterian: boolean;
    spicy: boolean;
    default_sauce?: string; 
    toppings?: string[];
    optional?: string[];
}

export interface PizzaCrust {
    name: string;
    title: string;
    price: number;
    for: string[];
}

export interface PizzaBase {
    name: string;
    title: string;
    price: number;
}

export interface PizzaSize {
    name: string;
    size: string;
    type: string;
    price: number;
    price_per_topping: number;
    margherita_price: number;
}

export interface Topping {
    name: string;
    title: string;
    vegeterian: boolean;
    spicy: boolean;
}

export interface PizzaMenu {
    pizzas: Pizza[];
    crusts: PizzaCrust[];
    bases: PizzaBase[];
    sizes: PizzaSize[];
    toppings: Topping[];
}