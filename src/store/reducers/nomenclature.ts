import { combineReducers } from 'helpers/redux';
import { Action } from 'redux';
import { IGeneralNomenclatureItem } from 'interfaces/nomenclature';
import { NomenclatureTypes, INomenclatureAction } from 'actions/nomenclature';
import PaginationEntry, { EMPTY_PAGINATION_ENTRY } from 'entries/pagination';

export interface INomenclatureState {
  isLoading: boolean;
  products_for_buy_add: PaginationEntry<IGeneralNomenclatureItem>;
  products_for_sell_add: PaginationEntry<IGeneralNomenclatureItem>;
  nomenclature: PaginationEntry<IGeneralNomenclatureItem>;
}

export const initState: INomenclatureState = {
  isLoading: false,
  products_for_buy_add: EMPTY_PAGINATION_ENTRY,
  products_for_sell_add: EMPTY_PAGINATION_ENTRY,
  nomenclature: EMPTY_PAGINATION_ENTRY,
};

function nomenclatureReducer(state = initState, action: INomenclatureAction): INomenclatureState {
  switch (action.type) {
    case NomenclatureTypes.LOADING_NOMENCLATURE_BY_ID_REQUEST:
      return { ...state, isLoading: true };
    case NomenclatureTypes.LOADING_NOMENCLATURE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products_for_buy_add: {
          ...state.products_for_buy_add,
          results: action.nomenclature?.results ? action.nomenclature.results : [],
        },
      };
    case NomenclatureTypes.CREATE_CUSTOM_NOMENCLATURE_FOR_BUY_REQUEST:
      return { ...state, isLoading: true };
    case NomenclatureTypes.CREATE_CUSTOM_NOMENCLATURE_FOR_BUY_SUCCESS:
      if (action.nomenclatureResults) {
        return {
          ...state,
          isLoading: false,
          products_for_buy_add: {
            ...state.products_for_buy_add,

            results: [...state.products_for_buy_add.results, action.nomenclatureResults],
          },
        };
      } else {
        return {
          ...state,
        };
      }
    case NomenclatureTypes.CREATE_CUSTOM_NOMENCLATURE_FOR_SELL_REQUEST:
      return { ...state, isLoading: true };
    case NomenclatureTypes.CREATE_CUSTOM_NOMENCLATURE_FOR_SELL_SUCCESS:
      if (action.nomenclatureResults) {
        return {
          ...state,
          isLoading: false,
          products_for_buy_add: {
            ...state.products_for_buy_add,

            results: [...state.products_for_sell_add.results, action.nomenclatureResults],
          },
        };
      } else {
        return {
          ...state,
        };
      }
    case NomenclatureTypes.LOADING_NOMENCLATURE_SUCCESS:
      return {
        ...state,
        nomenclature: {
          ...state.nomenclature,
          results: action.nomenclature?.results ? action.nomenclature.results : [],
        },
      };
  }
  return state;
}

const nomenclatureReducers = (state: INomenclatureState, action: Action) =>
  combineReducers(state, action, nomenclatureReducer);
export default nomenclatureReducers;
