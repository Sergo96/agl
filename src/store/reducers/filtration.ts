import { combineReducers } from 'helpers/redux';
import { Action } from 'redux';
import { IUsersLotStateAdditionsAction } from 'actions/auctions';
import { ILotsParams } from './../../types/interfaces/auctions';
import { FiltrationTypes } from 'actions/filtration';

export interface IFiltrationState {
  isLoading: boolean;
  auctionsFilterParams: ILotsParams[] | null;
 
}

export const initState: IFiltrationState = {
  isLoading: false,
  auctionsFilterParams: [
    {
      company: '',
      nomenclature: '',
      delivery_method: '',
      payment_method: '',
      is_purchase: null,
      category: '',
      price: {
        minValue: '',
        maxValue: '',
      },
      quantity: {
        minValue: '',
        maxValue: '',
      },
      typeSorting: '',
      typeTab: 0,
    },
    {
      company: '',
      nomenclature: '',
      delivery_method: '',
      payment_method: '',
      is_purchase: null,
      category: '',
      price: {
        minValue: '',
        maxValue: '',
      },
      quantity: {
        minValue: '',
        maxValue: '',
      },
      typeSorting: '',
      typeTab: 1,
    },
    {
      company: '',
      nomenclature: '',
      delivery_method: '',
      payment_method: '',
      is_purchase: null,
      category: '',
      price: {
        minValue: '',
        maxValue: '',
      },
      quantity: {
        minValue: '',
        maxValue: '',
      },
      typeSorting: '',
      typeTab: 2,
    },
    {
      company: '',
      nomenclature: '',
      delivery_method: '',
      payment_method: '',
      is_purchase: null,
      category: '',
      price: {
        minValue: '',
        maxValue: '',
      },
      quantity: {
        minValue: '',
        maxValue: '',
      },
      typeSorting: '',
      typeTab: 3,
    },
    {
      company: '',
      nomenclature: '',
      delivery_method: '',
      payment_method: '',
      is_purchase: null,
      category: '',
      price: {
        minValue: '',
        maxValue: '',
      },
      quantity: {
        minValue: '',
        maxValue: '',
      },
      typeSorting: '',
      typeTab: 4,
    },
  ],
};

function filtrationReducer(state = initState, action: IUsersLotStateAdditionsAction): IFiltrationState {
  switch (action.type) {
    case FiltrationTypes.SAVE_FILTER_PARAMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        auctionsFilterParams: action.filterParams ? action.filterParams : null,
      };
  }
  return state;
}


const filtrationReducers = (state: IFiltrationState, action: Action) =>
  combineReducers(state, action, filtrationReducer);
export default filtrationReducers;
