export interface User {
    _id: string;
    name: string;
    postcode?: string;
    address?: string;
    email: string;
    password?: string;
    phone?: string;
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