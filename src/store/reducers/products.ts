import { combineReducers } from 'helpers/redux';
import { Action } from 'redux';
import { ProductsTypes, IProductsAction } from 'actions/products';
import PaginationEntry, { EMPTY_PAGINATION_ENTRY } from 'entries/pagination';
import { IGeneralNomenclatureItem } from 'interfaces/nomenclature';

export interface IProductsState {
  isLoading: boolean;
  products_for_buy: PaginationEntry<IGeneralNomenclatureItem>;
  products_for_sell: PaginationEntry<IGeneralNomenclatureItem>;
}

export const initState: IProductsState = {
  isLoading: false,
  products_for_buy: EMPTY_PAGINATION_ENTRY,
  products_for_sell: EMPTY_PAGINATION_ENTRY,
};

function productsReducer(state = initState, action: IProductsAction): IProductsState {
  switch (action.type) {
    case ProductsTypes.LOADING_PRODUCTS_FOR_SALE_REQUEST:
      return { ...state, isLoading: true };
    case ProductsTypes.LOADING_PRODUCTS_FOR_SALE_SUCCESS:
      if (action?.payload?.results) {
        return {
          ...state,
          isLoading: false,
          products_for_sell: { ...state.products_for_sell, results: action.payload.results },
        };
      } else {
        return {
          ...state,
        };
      }
    case ProductsTypes.LOADING_PRODUCTS_FOR_BUY_REQUEST:
      return { ...state, isLoading: true };
    case ProductsTypes.LOADING_PRODUCTS_FOR_BUY_SUCCESS:
      if (action?.payload?.results) {
        return {
          ...state,
          isLoading: false,
          products_for_buy: { ...state.products_for_buy, results: action.payload.results },
        };
      } else {
        return {
          ...state,
        };
      }
  }
  return state;
}

const productsReducers = (state: IProductsState, action: Action) => combineReducers(state, action, productsReducer);
export default productsReducers;
