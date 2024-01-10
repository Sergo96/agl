import { ITariffsAction, TariffsActionTypes } from 'actions/subscriptions';
import PaginationEntry, { EMPTY_PAGINATION_ENTRY } from 'entries/pagination';
import { combineReducers } from 'helpers/redux';
import { ITariffsInfo } from 'interfaces/subscriptions';
import { Action } from 'redux';

export interface ISubscriptionsState {
  isLoading: boolean;
  tariffsInfo: PaginationEntry<ITariffsInfo>;
  currentTariffInfo?: ITariffsInfo;
}

export const initState: ISubscriptionsState = {
  isLoading: false,
  tariffsInfo: EMPTY_PAGINATION_ENTRY,
  currentTariffInfo: undefined,
};

function subscriptionsReducer(state = initState, action: ITariffsAction): ISubscriptionsState {
  switch (action.type) {
    case TariffsActionTypes.GET_TARIFFS_REQUEST:
      return { ...state, isLoading: true };
    case TariffsActionTypes.GET_TARIFFS_SUCCESS:
      return {
        ...state,
        tariffsInfo: {
          ...state.tariffsInfo,
          results: action?.tariffsInfo?.results ? action.tariffsInfo.results : state.tariffsInfo.results,
        },
      };

    case TariffsActionTypes.GET_CURRENT_TARIFF_REQUEST:
      return { ...state, isLoading: true };
    case TariffsActionTypes.GET_CURRENT_TARIFF_SUCCESS:
      return {
        ...state,
        currentTariffInfo: action?.currentTariffInfo ? action.currentTariffInfo : state.currentTariffInfo,
      };
  }
  return state;
}

const subscriptionsReducers = (state: ISubscriptionsState, action: Action) =>
  combineReducers(state, action, subscriptionsReducer);

export default subscriptionsReducers;
