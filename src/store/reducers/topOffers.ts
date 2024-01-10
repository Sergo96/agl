import { combineReducers } from 'helpers/redux';
import { Action } from 'redux';

import PaginationEntry, { EMPTY_PAGINATION_ENTRY } from 'entries/pagination';
import { ITopOffersResults } from 'interfaces/topOffers';
import { ITopOffersAction, TopOffersTypes } from 'actions/topOffers';

export interface ITopOffersState {
  isLoading: boolean;
  data: PaginationEntry<ITopOffersResults>;
}

export const initState: ITopOffersState = {
  isLoading: false,
  data: EMPTY_PAGINATION_ENTRY
};

function topOffersReducer(state = initState, action: ITopOffersAction): ITopOffersState {
  switch (action.type) {
    case TopOffersTypes.LOADING_TOP_OFFERS_REQUEST:
      return { ...state, isLoading: true };
    case TopOffersTypes.LOADING_TOP_OFFERS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: {
            ...state.data, 
            results: action.payload.results
          }
        };
  }
  return state;
}

const topOffersReducers = (state: ITopOffersState, action: Action) => combineReducers(state, action, topOffersReducer);
export default topOffersReducers;
