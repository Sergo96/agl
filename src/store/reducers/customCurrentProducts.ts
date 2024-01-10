import { combineReducers } from 'helpers/redux';
import { Action } from 'redux';
import PaginationEntry, { EMPTY_PAGINATION_ENTRY } from 'entries/pagination';
import { ILotsResult} from '../../types/interfaces/auctions';
import { CustomCurrentProductsTypes, IUsersCustomCurrentProductsStateAction } from 'actions/customCurrentProducts';
import { TypeTab } from 'interfaces/auth';

export interface ICustomCurrentProductsState {
  isLoading: boolean;
  customCurrenProductForBuy: PaginationEntry<ILotsResult>;
  customCurrenProductForSell: PaginationEntry<ILotsResult>;
  myCustomCurrentProducts: PaginationEntry<ILotsResult>;
  tab: TypeTab;
}

export const initState: ICustomCurrentProductsState = {
  isLoading: false,
  customCurrenProductForBuy: EMPTY_PAGINATION_ENTRY,
  customCurrenProductForSell: EMPTY_PAGINATION_ENTRY,
  myCustomCurrentProducts: EMPTY_PAGINATION_ENTRY,
  tab: 1,
};

function customCurrentProductsReducer(state = initState, action: IUsersCustomCurrentProductsStateAction): ICustomCurrentProductsState {
  switch (action.type) {
    case CustomCurrentProductsTypes.LOADING_CUSTOM_CURRENT_PRODUCTS_FOR_SELL_REQUEST:
    case CustomCurrentProductsTypes.LOADING_CUSTOM_CURRENT_PRODUCTS_FOR_BUY_REQUEST:
    case CustomCurrentProductsTypes.LOADING_MY_CUSTOM_CURRENT_PRODUCTS_REQUEST:
      return { ...state, isLoading: true };
    case CustomCurrentProductsTypes.LOADING_CUSTOM_CURRENT_PRODUCTS_FOR_BUY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        customCurrenProductForBuy: {
          ...state.customCurrenProductForBuy,
          results: action.customCurrenProductForBuy ? action.customCurrenProductForBuy.results : [],
        },
      };
    case CustomCurrentProductsTypes.LOADING_CUSTOM_CURRENT_PRODUCTS_FOR_SELL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        customCurrenProductForSell: {
          ...state.customCurrenProductForSell,
          results: action.customCurrenProductForSell ? action.customCurrenProductForSell.results : [],
        },
      };
    case CustomCurrentProductsTypes.LOADING_MY_CUSTOM_CURRENT_PRODUCTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        myCustomCurrentProducts: {
          ...state.myCustomCurrentProducts,
          results: action.myCustomCurrentProducts ? action.myCustomCurrentProducts.results : [],
        },
      };
    }
    case CustomCurrentProductsTypes.ON_CHANGE_TAB_SUCCESS:
      return {
        ...state,
        tab: action.tab ? action.tab : 0,
      };
  }
  return state;
}


const customCurrentProductsReducers = (state: ICustomCurrentProductsState, action: Action) =>
  combineReducers(state, action, customCurrentProductsReducer);
export default customCurrentProductsReducers;
