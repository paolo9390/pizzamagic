export interface Burger {
    name: string;
    title: string;
    type: string;
    spicy: boolean;
    price_size: PriceSize[];
}

export interface PriceSize {
    size: string;
    price: number;
    description: string;
}