import { PizzaMagicShop } from './pizza-magic.shop';

export interface User {
    name: string;
    surname: string;
    postcode: string;
    address: string;
    email: string;
    password: string;
    role?: string;
    phone: string;
    tokens?: any[];
}

export interface UserAuthenticated {
    user: User;
    token: string;
}

export interface PizzaMagicUser {
    token: string;
    email: string;
    name: string;
}

export interface UserPreferences {
    favourite_shop: PizzaMagicShop;
    fulfillment_method: string;
}