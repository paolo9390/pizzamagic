export interface GarlicBread {
    _id: number;
    popular?: boolean;
    name: string;
    title: string;
    description: string;
    toppings: string[];
    price_size: PriceSize[];
    spicy?: boolean;
}

export interface PriceSize {
    size: string;
    price: number;
    description: string;
}