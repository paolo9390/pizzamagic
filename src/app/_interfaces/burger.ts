export interface Burger {
    _id: number;
    popular?: boolean;
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