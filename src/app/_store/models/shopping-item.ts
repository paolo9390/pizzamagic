export interface ShoppingItem {
    amount: number;
    type: string;
    price: number;
    product: Product;
}

export interface Product {
    name: string;
    title: string;
    description: string;
    notes?: string;
    extras?: string[];
}