import { Action } from '@ngrx/store';
import { MenuItem } from '../models/basket';

export enum BasketActionTypes {
  ADD_ITEM = '[BASKET] Add Item',
  EDIT_ITEM = '[BASKET] Edit Item',
  DELETE_ITEM = '[BASKET] Delete Item',
  RESET_BASKET = '[BASKET] Reset Basket',
  SET_TIMESTAMP = '[BASKET] Set Timestamo'
}

export class AddItemAction implements Action {
  readonly type = BasketActionTypes.ADD_ITEM

  constructor(public payload: MenuItem) { }
}

export class DeleteItemAction implements Action {
  readonly type = BasketActionTypes.DELETE_ITEM

  constructor(public payload: MenuItem) { }
}

export class EditItemAction implements Action {
  readonly type = BasketActionTypes.EDIT_ITEM

  constructor(public payload: MenuItem) { }
}

export class ResetBasketAction implements Action {
  readonly type = BasketActionTypes.RESET_BASKET

  constructor() { }
}

export class SetTimestampAction implements Action {
  readonly type = BasketActionTypes.SET_TIMESTAMP

  constructor(public payload: string) { }
}

export type BasketActions = AddItemAction | EditItemAction | DeleteItemAction | SetTimestampAction | ResetBasketAction