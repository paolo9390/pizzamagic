import { MetaReducer, ActionReducerMap, ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AppState } from '../models/app-state';
import { basketReducer } from '../reducers/basket.reducer';
import { favouriteReducer } from '../reducers/favourite.reducer';


export const reducers: ActionReducerMap<AppState> = {basket: basketReducer, favourite: favouriteReducer};
 
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
      keys: [
          'basket',
          'favourite'
        ],
        rehydrate: true,
    })(reducer);
}
export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];