import { FavouriteAction, FavouriteActionTypes } from '../actions/favourite.actions';
import { FavouriteState } from '../models/favourite';

const initialState: FavouriteState = {
    shop: {
        name: '',
        address: '',
        postcode: '',
        distance: 0
    }
};

export function favouriteReducer(
    state: FavouriteState = initialState, 
    action: FavouriteAction) {
    switch (action.type) {
        case FavouriteActionTypes.SET_FAVOURITE_SHOP:
            return {...state, shop: action.payload};
        case FavouriteActionTypes.RESET_FAVOURITE_SHOP:
            return Object.assign({}, state.shop = undefined)
        default: 
            return state;
    }
}