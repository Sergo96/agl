import { ActionCreator, Action, Dispatch } from 'redux';
import { dispatchError } from './notifications';
import IErrorAction from 'interfaces/errors';
import { getHomePageData } from 'api/info';
import { IHomePageData } from 'interfaces/homePage';

export enum HomePageTypes {
  LOADING_HOME_PAGE_DATA_REQUEST = 'LOADING_HOME_PAGE_DATA_REQUEST',
  LOADING_HOME_PAGE_DATA_SUCCESS = 'LOADING_HOME_PAGE_DATA_SUCCESS',
  LOADING_HOME_PAGE_DATA_ERROR = 'LOADING_HOME_PAGE_DATA_ERROR'
}

export interface IHomePageDataAction extends IErrorAction {
  payload: IHomePageData;
}


const loadingHomePageRequest: ActionCreator<Action> = () => {
  return { type: HomePageTypes.LOADING_HOME_PAGE_DATA_REQUEST };
};

const loadingHomePageSuccess: ActionCreator<IHomePageDataAction> = (payload: IHomePageData) => {
  return { type: HomePageTypes.LOADING_HOME_PAGE_DATA_SUCCESS, payload };
};

const loadingHomePageError: ActionCreator<Action> = () => {
  return { type: HomePageTypes.LOADING_HOME_PAGE_DATA_ERROR };
};

export const loadingHomePageData = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingHomePageRequest());
    try {
      const nomenclature = await getHomePageData();
      dispatch(loadingHomePageSuccess(nomenclature));
    } catch (e) {
      dispatchError(dispatch, e, loadingHomePageError);
    }
  };
};


