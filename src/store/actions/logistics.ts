import { getTransportCompaniesData } from 'api/logistics';
import AysAgroError from 'entries/errors';
import PaginationEntry from 'entries/pagination';
import IErrorAction from 'interfaces/errors';
import { ITransportCompaniesInfo } from 'interfaces/logistics';
import { Action, ActionCreator, Dispatch } from 'redux';
import { dispatchError } from './notifications';

export enum LogisticsTypes {
  LOADING_LOGISTICS_DATA_REQUEST = 'LOADING_LOGISTICS_DATA_REQUEST',
  LOADING_LOGISTICS_DATA_SUCCESS = 'LOADING_LOGISTICS_DATA_SUCCESS',
  LOADING_DIRECTIONS_DATA_REQUEST = 'LOADING_DIRECTIONS_DATA_REQUEST',
  LOADING_DIRECTIONS_DATA_SUCCESS = 'LOADING_DIRECTIONS_DATA_SUCCESS',
  REQUEST_ERROR = 'REQUEST_ERROR',
}

export interface ILogisticsAction extends IErrorAction {
  transportCompaniesInfo: PaginationEntry<ITransportCompaniesInfo>;
}

const loadingLogisticsRequest: ActionCreator<Action> = () => {
  return { type: LogisticsTypes.LOADING_LOGISTICS_DATA_REQUEST };
};

const requestError: ActionCreator<Action> = (error: AysAgroError) => {
  return { type: LogisticsTypes.REQUEST_ERROR, error };
};

const loadingLogisticsSuccess: ActionCreator<ILogisticsAction> = (
  transportCompaniesInfo: PaginationEntry<ITransportCompaniesInfo>
) => {
  return { type: LogisticsTypes.LOADING_LOGISTICS_DATA_SUCCESS, transportCompaniesInfo };
};

export const loadingLogistics = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingLogisticsRequest());
    try {
      const logistics = await getTransportCompaniesData();
      dispatch(loadingLogisticsSuccess(logistics));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};
