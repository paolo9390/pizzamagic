import { ShoppingItem } from '../models/shopping-item';
import { ShoppingAction, ShoppingActionTypes } from '../actions/shopping.actions';

const initialState: ShoppingItem[] = [];

export function shoppingReducer(state: ShoppingItem[] = initialState, action: ShoppingAction) {
    switch (action.type) {
        case ShoppingActionTypes.ADD_ITEM:
            return [...state, action.payload];
        case ShoppingActionTypes.EDIT_ITEM:
            return state.map(shopping => {
                if (shopping.product === action.payload.product) {
                    return Object.assign({}, shopping, action.payload)
                }
                return shopping;
            });
        case ShoppingActionTypes.DELETE_ITEM:
            return state.filter(item => item !== action.payload);
        default: 
            return state;
    }
}