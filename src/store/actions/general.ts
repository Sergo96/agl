import { getUnitsList } from './../../api/general';
import { getCountryList, getOwnershipList, getStatusList } from 'api/general';
import AysAgroError from 'entries/errors';
import IErrorAction from 'interfaces/errors';
import { ICountry, IBaseDTO } from 'interfaces/general';
import { Action, ActionCreator, Dispatch } from 'redux';
import { dispatchError } from './notifications';

export enum GeneralActionTypes {
  LOADING_COUNTRY_LIST_REQUEST = 'LOADING_COUNTRY_LIST_REQUEST',
  LOADING_COUNTRY_LIST_SUCCESS = 'LOADING_COUNTRY_LIST_SUCCESS',
  LOADING_OWNERSHIP_LIST_REQUEST = 'LOADING_OWNERSHIP_LIST_REQUEST',
  LOADING_OWNERSHIP_LIST_SUCCESS = 'LOADING_OWNERSHIP_LIST_SUCCESS',
  LOADING_STATUS_LIST_REQUEST = 'LOADING_STATUS_LIST_REQUEST',
  LOADING_STATUS_LIST_SUCCESS = 'LOADING_STATUS_LIST_SUCCESS',
  LOADING_UNITS_LIST_REQUEST = 'LOADING_UNITS_LIST_REQUEST',
  LOADING_UNITS_LIST_SUCCESS = 'LOADING_UNITS_LIST_SUCCESS',
  REQUEST_ERROR = 'REQUEST_ERROR',
}

export interface ICountryListAction extends IErrorAction {
  countryList: ICountry[];
}
export interface IOwnershipListAction extends IErrorAction {
  ownershipList: IBaseDTO[];
}
export interface IStatusListAction extends IErrorAction {
  statusList: IBaseDTO[];
}

export interface IUnitsListAction extends IErrorAction {
  unitsList: IBaseDTO[];
}

const requestError: ActionCreator<Action> = (error: AysAgroError) => {
  return { type: GeneralActionTypes.REQUEST_ERROR, error };
};

const loadingCountryListRequest: ActionCreator<Action> = () => {
  return { type: GeneralActionTypes.LOADING_COUNTRY_LIST_REQUEST };
};

const loadingCountryListSuccess: ActionCreator<ICountryListAction> = (countryList: ICountry[]) => {
  return { type: GeneralActionTypes.LOADING_COUNTRY_LIST_SUCCESS, countryList };
};

export const loadingCountryList = (isAvailableForUser: boolean) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingCountryListRequest());
    try {
      const countryList = await getCountryList(isAvailableForUser);
      dispatch(loadingCountryListSuccess(countryList));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};

const loadingOwnershipListRequest: ActionCreator<Action> = () => {
  return { type: GeneralActionTypes.LOADING_OWNERSHIP_LIST_REQUEST };
};

const loadingOwnershipListSuccess: ActionCreator<IOwnershipListAction> = (ownershipList: IBaseDTO[]) => {
  return { type: GeneralActionTypes.LOADING_OWNERSHIP_LIST_SUCCESS, ownershipList };
};

export const loadingOwnershipList = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingOwnershipListRequest());
    try {
      const ownershipList = await getOwnershipList();
      dispatch(loadingOwnershipListSuccess(ownershipList));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};

const loadingStatusListRequest: ActionCreator<Action> = () => {
  return { type: GeneralActionTypes.LOADING_STATUS_LIST_REQUEST };
};

const loadingStatusListSuccess: ActionCreator<IStatusListAction> = (statusList: IBaseDTO[]) => {
  return { type: GeneralActionTypes.LOADING_STATUS_LIST_SUCCESS, statusList };
};

export const loadingStatusList = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingStatusListRequest());
    try {
      const statusList = await getStatusList();
      dispatch(loadingStatusListSuccess(statusList));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};

const loadingUnitsListRequest: ActionCreator<Action> = () => {
  return { type: GeneralActionTypes.LOADING_UNITS_LIST_REQUEST };
};

const loadingUnitsListSuccess: ActionCreator<IUnitsListAction> = (unitsList: IBaseDTO[]) => {
  return { type: GeneralActionTypes.LOADING_UNITS_LIST_SUCCESS, unitsList };
};


export const loadingUnitsList = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingUnitsListRequest());
    try {
      const unitsList = await getUnitsList();
      dispatch(loadingUnitsListSuccess(unitsList));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};
