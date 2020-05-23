import { ShoppingState } from '../models/shopping';
import { ShoppingActions, ShoppingActionTypes } from '../actions/shopping.actions';

const initialState: ShoppingState = {
    list: []
};

export function shoppingReducer(
    state: ShoppingState = initialState, 
    action: ShoppingActions) {
    switch (action.type) {
        case ShoppingActionTypes.ADD_ITEM:
            return {
                ...state,
                list: [...state.list, action.payload]
          };
        case ShoppingActionTypes.EDIT_ITEM:
            return {
                ...state,
                list: state.list.map(shoppingItem => {
                    if (shoppingItem.product === action.payload.product) {
                        return Object.assign({}, shoppingItem, action.payload)
                    }
                    return shoppingItem;
                })
            }
        case ShoppingActionTypes.DELETE_ITEM:
            return {
                ...state,
                list: state.list.filter(item => item !== action.payload)
            };
        default: 
            return state;
    }
}