import { ShoppingState } from './shopping';
import { FavouriteState } from './favourite';

export interface AppState {
    readonly shopping: ShoppingState;
    readonly favourite: FavouriteState;
}