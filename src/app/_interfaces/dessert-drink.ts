export interface DessertDrink {
    name: string;
    title: string;
    options?: string[];
    price: number;
}

export interface DDs {
    desserts: DessertDrink;
    drinks: DessertDrink;
}