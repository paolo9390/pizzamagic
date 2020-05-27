import { ShoppingState } from './shopping';
import { Basket } from './basket';
import { FavouriteState } from './favourite';

export interface AppState {
    readonly basket: Basket;
    readonly favourite: FavouriteState;
}