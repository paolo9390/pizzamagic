import { MenuItem } from '../_store/models/basket';

export interface Checkout {
    shop_id: number;
    fulfillment_method: string;
    user_address_id?: string;
    scheduled_delivery_day?: string;
    scheduled_delivery_time?: string;
    target_delivery_time?: string;
    notes?: string;
    currency_code: string;
    currency_symbol: string;
    country_code: string;
    total: number;
    total_formatted: string;
    basket: MenuItem[];
}