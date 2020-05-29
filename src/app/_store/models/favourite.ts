import { PizzaMagicShop } from '../../_interfaces/pizza-magic.shop';
import { Address } from '../../_interfaces/user';

export interface FavouriteState { 
    shop: PizzaMagicShop;
    fulfillment_method: string;
    address: Address;
}