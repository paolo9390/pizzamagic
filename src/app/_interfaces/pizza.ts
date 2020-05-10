export interface Pizza {
    name: string;
    title: string;
    description: string;
    img?: string;
    vegan: boolean;
    vegeterian: boolean;
    spicy: boolean;
    toppings?: string[];
    optional?: string[];
}

export interface PizzaBase {
    name: string;
    title: string;
    price: number;
    for: string[];
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
    bases: PizzaBase[];
    sizes: PizzaSize[];
    toppings: Topping[];
}