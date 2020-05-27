export interface ShoppingItem {
    quantity: number;
    type: string;
    price: number;
    product: Product;
}

export interface Product {
    name: string;
    title: string;
    description: string;
    optional?: string[];
    notes?: string;
    extras?: string[];
}

export interface ShoppingState { 
    list: ShoppingItem[];
}