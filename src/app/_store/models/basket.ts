export interface MenuItem {
    name: string;
    title: string;
    description: string;
    menu_item_id: number;
    type: string;
    price: number;
    quantity: number;
    top_level: boolean;
    notes?: string;
    product_modifier?: ProductModifier[];
}

export interface ProductModifier {
    menu_item_id?: number;
    name: string;
    description?: string; 
    quantity: number;
    top_level: boolean;
}

export interface Basket { 
    list: MenuItem[];
    timestamp: string;
}