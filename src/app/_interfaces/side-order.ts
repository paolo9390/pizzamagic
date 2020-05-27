export interface SideOrder {
    _id: number;
    popular?: boolean;
    name: string;
    title: string;
    spicy: boolean;
    type: string;
    price_size: PriceSize;
    extras?: string[];
}

export interface PriceSize {
    size: string;
    price: number;
    description?: string;
}

export interface Dip {
    name: string;
    title: string;
    spicy: boolean;
    price: number;
}