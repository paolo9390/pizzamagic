import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AddItemAction, ShoppingActionTypes, DeleteItemAction, EditItemAction } from '../actions/shopping.actions';

@Injectable()
export class ShoppingEffects {
  @Effect() name$: Observable<Action> = this.actions$.pipe(ofType('ACTIONTYPE'));

  @Effect() addShoppingItem$ = this.actions$
    .pipe(
      ofType<AddItemAction>(ShoppingActionTypes.ADD_ITEM)
  )
  @Effect() deleteShoppingItem$ = this.actions$
  .pipe(
    ofType<DeleteItemAction>(ShoppingActionTypes.DELETE_ITEM)
  )
  @Effect() editShoppingItem$ = this.actions$
  .pipe(
    ofType<EditItemAction>(ShoppingActionTypes.EDIT_ITEM)
  )


  constructor(
    private actions$: Actions
  ) {}



}