import { ILogisticsAction, LogisticsTypes } from 'actions/logistics';
import PaginationEntry, { EMPTY_PAGINATION_ENTRY } from 'entries/pagination';
import { ITransportCompaniesInfo } from 'interfaces/logistics';

export interface ILogisticsState {
  isLoading: boolean;
  transportCompaniesInfo: PaginationEntry<ITransportCompaniesInfo>;
}

export const initState: ILogisticsState = {
  isLoading: false,
  transportCompaniesInfo: EMPTY_PAGINATION_ENTRY,
};

export function logisticsReducer(state = initState, action: ILogisticsAction): ILogisticsState {
  switch (action.type) {
    case LogisticsTypes.LOADING_LOGISTICS_DATA_REQUEST:
      return { ...state, isLoading: true };
    case LogisticsTypes.LOADING_LOGISTICS_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        transportCompaniesInfo: {
          ...state.transportCompaniesInfo,
          results: action?.transportCompaniesInfo?.results ? action.transportCompaniesInfo.results : [],
        },
      };
  }
  return state;
}
