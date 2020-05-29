import { Action } from '@ngrx/store';
import { PizzaMagicShop } from '../../_interfaces/pizza-magic.shop';
import { Address } from '../../_interfaces/user';

export enum FavouriteActionTypes {
  SET_FAVOURITE_SHOP = '[FAVOURITE] Set Favourite Shop',
  RESET_FAVOURITE_SHOP = '[FAVOURITE] Reset Favourite Shop',
  SET_FAVOURITE_METHOD = '[FAVOURITE] Set Favourite Method',
  SET_FAVOURITE_ADDRESS = '[FAVOURITE] Set Favourite Address'
}

export class SetFavouriteShopAction implements Action {
  readonly type = FavouriteActionTypes.SET_FAVOURITE_SHOP

  constructor(public payload: PizzaMagicShop) { }
}

export class SetFavouriteMethodAction implements Action {
  readonly type = FavouriteActionTypes.SET_FAVOURITE_METHOD

  constructor(public payload: string) { }
}

export class SetFavouriteAddressAction implements Action {
  readonly type = FavouriteActionTypes.SET_FAVOURITE_ADDRESS

  constructor(public payload: Address) { }
}

export class ResetFavouriteShopAction implements Action {
  readonly type = FavouriteActionTypes.RESET_FAVOURITE_SHOP

  constructor(public payload: PizzaMagicShop) { }
}

export type FavouriteAction = SetFavouriteShopAction | SetFavouriteMethodAction | SetFavouriteAddressAction | ResetFavouriteShopAction; 