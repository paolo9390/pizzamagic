import { PizzaMagicShop } from './pizza-magic.shop';

export interface User {
    name: string;
    surname: string;
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
    _id?: string;
    favourite_shop: PizzaMagicShop;
    fulfillment_method: string;
    favourite_address: Address;
}

export interface Address {
    _id?: string;
    user_id?: string;
    postcode: string;
    address: string;
    phone: string;
    notes?: string;
}