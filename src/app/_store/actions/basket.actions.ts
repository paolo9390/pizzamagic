import { Action } from '@ngrx/store';
import { MenuItem } from '../models/basket';

export enum BasketActionTypes {
  ADD_ITEM = '[BASKET] Add Item',
  EDIT_ITEM = '[BASKET] Edit Item',
  DELETE_ITEM = '[BASKET] Delete Item'
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

export type BasketActions = AddItemAction | EditItemAction | DeleteItemAction