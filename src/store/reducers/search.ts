import { combineReducers } from 'helpers/redux';
import { Action } from 'redux';
import { ISearchAction, SearchTypes } from 'actions/search';
import { INotificationsState } from './notifications';
import AysAgroError from 'entries/errors';
import { IGeneralNomenclatureItem } from 'interfaces/nomenclature';

export interface ISearchState extends INotificationsState {
  isLoading: boolean;
  nomenclature: IGeneralNomenclatureItem[];
  errorMessage: AysAgroError | undefined;
}

export const initState: ISearchState = {
  isLoading: false,
  nomenclature: [],
  errorMessage: undefined,
};

function searchNomenclatureReducer(state = initState, action: ISearchAction): ISearchState {
  switch (action.type) {
    case SearchTypes.SEARCH_NOMENCLATURE_REQUEST:
      return { ...state, isLoading: true };
    case SearchTypes.SEARCH_NOMENCLATURE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        nomenclature: action.payload,
      };
    case SearchTypes.SEARCH_NOMENCLATURE_ERROR:
      return { ...state, errorMessage: action.error };
  }
  return state;
}

const searchReducer = (state: ISearchState, action: Action) =>
  combineReducers(state, action, searchNomenclatureReducer);
export default searchReducer;
