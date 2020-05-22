import { Action } from '@ngrx/store';
import { ShoppingItem } from '../models/shopping';

export enum ShoppingActionTypes {
  ADD_ITEM = '[SHOPPING] Add Item',
  EDIT_ITEM = '[SHOPPING] Edit Item',
  DELETE_ITEM = '[SHOPPING] Delete Item'
}

export class AddItemAction implements Action {
  readonly type = ShoppingActionTypes.ADD_ITEM

  constructor(public payload: ShoppingItem) { }
}

export class DeleteItemAction implements Action {
  readonly type = ShoppingActionTypes.DELETE_ITEM

  constructor(public payload: ShoppingItem) { }
}

export class EditItemAction implements Action {
  readonly type = ShoppingActionTypes.EDIT_ITEM

  constructor(public payload: ShoppingItem) { }
}

export type ShoppingActions = AddItemAction | EditItemAction | DeleteItemAction