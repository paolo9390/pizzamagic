import { FavouriteAction, FavouriteActionTypes } from '../actions/favourite.actions';
import { FavouriteState } from '../models/favourite';

const initialState: FavouriteState = {
    shop: null,
    address: null,
    fulfillment_method: 'delivery'
};

export function favouriteReducer(
    state: FavouriteState = initialState, 
    action: FavouriteAction) {
    switch (action.type) {
        case FavouriteActionTypes.SET_FAVOURITE_SHOP:
            return {...state, shop: action.payload};
        case FavouriteActionTypes.SET_FAVOURITE_ADDRESS:
            return {...state, address: action.payload};
        case FavouriteActionTypes.SET_FAVOURITE_METHOD:
            return {...state, fulfillment_method: action.payload};
        case FavouriteActionTypes.RESET_FAVOURITE_SHOP:
            return Object.assign({}, state.shop = undefined)
        default: 
            return state;
    }
}