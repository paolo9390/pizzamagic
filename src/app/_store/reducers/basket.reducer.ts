import { Basket } from '../models/basket';
import { BasketActions, BasketActionTypes } from '../actions/basket.actions';

const initialState: Basket = {
    list: []
};

export function basketReducer(
    state: Basket = initialState, 
    action: BasketActions) {
    switch (action.type) {
        case BasketActionTypes.ADD_ITEM:
            return {
                ...state,
                list: [...state.list, action.payload]
          };
        case BasketActionTypes.EDIT_ITEM:
            return {
                ...state,
                list: state.list.map(menuItem => {
                    if (menuItem.menu_item_id === action.payload.menu_item_id) {
                        return Object.assign({}, menuItem, action.payload)
                    }
                    return menuItem;
                })
            }
        case BasketActionTypes.DELETE_ITEM:
            return {
                ...state,
                list: state.list.filter(item => item !== action.payload)
            };
        default: 
            return state;
    }
}