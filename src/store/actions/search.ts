import { Action, ActionCreator, Dispatch } from 'redux';
import IErrorAction from 'interfaces/errors';
import { dispatchError } from './notifications';
import { getSearchNomencalture } from 'api/search';
import { IGeneralNomenclatureItem } from 'interfaces/nomenclature';

export enum SearchTypes {
  SEARCH_NOMENCLATURE_REQUEST = 'SEARCH_NOMENCLATURE_REQUEST',
  SEARCH_NOMENCLATURE_SUCCESS = 'SEARCH_NOMENCLATURE_SUCCESS',
  SEARCH_NOMENCLATURE_ERROR = 'SEARCH_NOMENCLATURE_ERROR',
}

export interface ISearchAction extends IErrorAction {
  payload: IGeneralNomenclatureItem[];
}

const loadingSearchNomenclatureRequest: ActionCreator<Action> = () => {
  return { type: SearchTypes.SEARCH_NOMENCLATURE_REQUEST };
};

const loadingSearchNomenclatureSuccess: ActionCreator<ISearchAction> = (payload) => {
  return { type: SearchTypes.SEARCH_NOMENCLATURE_SUCCESS, payload };
};

const loadingSearchNomenclatureError: ActionCreator<Action> = () => {
  return { type: SearchTypes.SEARCH_NOMENCLATURE_ERROR };
};

export const loadingSearchNomenclature = (value: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingSearchNomenclatureRequest(value));
    try {
      const products = await getSearchNomencalture(value);
      dispatch(loadingSearchNomenclatureSuccess(products.results));
    } catch (e) {
      dispatchError(dispatch, e, loadingSearchNomenclatureError);
    }
  };
};
