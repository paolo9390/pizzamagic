import { Action } from '@ngrx/store';
import { ShopLocation } from 'src/app/_interfaces/pizza-magic.shop';

export enum FavouriteActionTypes {
  SET_FAVOURITE_SHOP = '[FAVOURITE] Set Favourite Shop',
  RESET_FAVOURITE_SHOP = '[FAVOURITE] Reset Favourite Shop'
}

export class SetFavouriteShopAction implements Action {
  readonly type = FavouriteActionTypes.SET_FAVOURITE_SHOP

  constructor(public payload: ShopLocation) { }
}

export class ResetFavouriteShopAction implements Action {
  readonly type = FavouriteActionTypes.RESET_FAVOURITE_SHOP

  constructor(public payload: ShopLocation) { }
}

export type FavouriteAction = SetFavouriteShopAction | ResetFavouriteShopAction; 