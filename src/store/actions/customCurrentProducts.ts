import { postMyCustomCurrentProduct } from './../../api/customCurrentProducts';
import { ActionCreator, Action, Dispatch } from 'redux';
import { dispatchError } from './notifications';
import IErrorAction from 'interfaces/errors';
import { ILotsParams, ILots, ILotsResult, ICreateLot } from 'interfaces/auctions';
import {
  getCustomCurrentProductsForSell,
  getCustomCurrentProductsForBuy,
  getMyCustomCurrentProducts,
} from 'api/customCurrentProducts';
import { TypeTab } from 'interfaces/auth';

export enum CustomCurrentProductsTypes {
  LOADING_CUSTOM_CURRENT_PRODUCTS_FOR_BUY_REQUEST = 'LOADING_CUSTOM_CURRENT_PRODUCTS_FOR_BUY_REQUEST',
  LOADING_CUSTOM_CURRENT_PRODUCTS_FOR_BUY_SUCCESS = 'LOADING_CUSTOM_CURRENT_PRODUCTS_FOR_BUY_SUCCESS',

  LOADING_CUSTOM_CURRENT_PRODUCTS_FOR_SELL_REQUEST = 'LOADING_CUSTOM_CURRENT_PRODUCTS_FOR_SELL_REQUEST',
  LOADING_CUSTOM_CURRENT_PRODUCTS_FOR_SELL_SUCCESS = 'LOADING_CUSTOM_CURRENT_PRODUCTS_FOR_SELL_SUCCESS',

  LOADING_MY_CUSTOM_CURRENT_PRODUCTS_REQUEST = 'LOADING_MY_CUSTOM_CURRENT_PRODUCTS_REQUEST',
  LOADING_MY_CUSTOM_CURRENT_PRODUCTS_SUCCESS = 'LOADING_MY_CUSTOM_CURRENT_PRODUCTS_SUCCESS',

  LOADING_CUSTOM_CURRENT_PRODUCTS_ERROR = 'LOADING_CUSTOM_CURRENT_PRODUCTS_ERROR',

  CREATE_CUSTOM_CURRENT_PRODUCT_REQUEST = 'CREATE_CUSTOM_CURRENT_PRODUCT_REQUEST',
  CREATE_CUSTOM_CURRENT_PRODUCT_SUCCESS = 'CREATE_CUSTOM_CURRENT_PRODUCT_SUCCESS',
  
  ON_CHANGE_TAB_SUCCESS = 'ON_CHANGE_TAB_SUCCESS',
}

export interface IUsersCustomCurrentProductsStateAction extends IErrorAction {
  customCurrenProductForBuy?: ILots;
  customCurrenProductForSell?: ILots;
  myCustomCurrentProducts?: ILots;
  tab?: TypeTab;
  newLot?: ILotsResult;
}

const loadingCustomCurrentProductError: ActionCreator<Action> = () => {
  return { type: CustomCurrentProductsTypes.LOADING_CUSTOM_CURRENT_PRODUCTS_ERROR };
};

const loadingCustomCurrentProductsForSellRequest: ActionCreator<Action> = () => {
  return { type: CustomCurrentProductsTypes.LOADING_CUSTOM_CURRENT_PRODUCTS_FOR_SELL_REQUEST };
};

const loadingCustomCurrentProductsForSellSuccess: ActionCreator<IUsersCustomCurrentProductsStateAction> = (
  customCurrenProductForSell: ILots
): IUsersCustomCurrentProductsStateAction => {
  return {
    type: CustomCurrentProductsTypes.LOADING_CUSTOM_CURRENT_PRODUCTS_FOR_SELL_SUCCESS,
    customCurrenProductForSell,
  };
};

export const loadingCustomCurrentProductsForSell = (params: ILotsParams) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingCustomCurrentProductsForSellRequest());
    try {
      const data = await getCustomCurrentProductsForSell(params);
      dispatch(loadingCustomCurrentProductsForSellSuccess(data));
    } catch (e) {
      dispatchError(dispatch, e, loadingCustomCurrentProductError);
    }
  };
};

const loadingCurrentForBuyRequest: ActionCreator<Action> = () => {
  return { type: CustomCurrentProductsTypes.LOADING_CUSTOM_CURRENT_PRODUCTS_FOR_BUY_REQUEST };
};
const loadingCurrentForBuySuccess: ActionCreator<IUsersCustomCurrentProductsStateAction> = (
  customCurrenProductForBuy: ILots
): IUsersCustomCurrentProductsStateAction => {
  return {
    type: CustomCurrentProductsTypes.LOADING_CUSTOM_CURRENT_PRODUCTS_FOR_BUY_SUCCESS,
    customCurrenProductForBuy,
  };
};

export const loadingCustomCurrentProductsForBuy = (params: ILotsParams) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingCurrentForBuyRequest());
    try {
      const data = await getCustomCurrentProductsForBuy(params);
      dispatch(loadingCurrentForBuySuccess(data));
    } catch (e) {
      dispatchError(dispatch, e, loadingCustomCurrentProductError);
    }
  };
};

const loadingMyCustomCurrentProductsRequest: ActionCreator<Action> = () => {
  return { type: CustomCurrentProductsTypes.LOADING_MY_CUSTOM_CURRENT_PRODUCTS_REQUEST };
};

const loadingMyCustomCurrentProductsSuccess: ActionCreator<IUsersCustomCurrentProductsStateAction> = (
  myCustomCurrentProducts
): IUsersCustomCurrentProductsStateAction => {
  return { type: CustomCurrentProductsTypes.LOADING_MY_CUSTOM_CURRENT_PRODUCTS_SUCCESS, myCustomCurrentProducts };
};

export const loadingMyCustomCurrentProducts = (params: ILotsParams) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingMyCustomCurrentProductsRequest());
    try {
      const data = await getMyCustomCurrentProducts(params);
      dispatch(loadingMyCustomCurrentProductsSuccess(data));
    } catch (e) {
      dispatchError(dispatch, e, loadingCustomCurrentProductError);
    }
  };
};

export const onChangeTabSuccess: ActionCreator<IUsersCustomCurrentProductsStateAction> = (
  tab: TypeTab
): IUsersCustomCurrentProductsStateAction => {
  return { type: CustomCurrentProductsTypes.ON_CHANGE_TAB_SUCCESS, tab };
};

export const onChangeTab = (value: TypeTab) => {
  return (dispatch: Dispatch) => {
    dispatch(onChangeTabSuccess(value));
  };
};

const createCustomCurrentProductRequest: ActionCreator<IUsersCustomCurrentProductsStateAction> = () => {
  return { type: CustomCurrentProductsTypes.CREATE_CUSTOM_CURRENT_PRODUCT_REQUEST };
};
const createCustomCurrentProductSuccess: ActionCreator<IUsersCustomCurrentProductsStateAction> = (newLot: ILotsResult): IUsersCustomCurrentProductsStateAction => {
  return { type: CustomCurrentProductsTypes.CREATE_CUSTOM_CURRENT_PRODUCT_SUCCESS, newLot };
};


export const createCustomCurrentProduct = (data: ICreateLot, successCallback: () => void) => {
  return async (dispatch: Dispatch) => {
    dispatch(createCustomCurrentProductRequest());
    try {
        const result = await postMyCustomCurrentProduct(data);
        dispatch(createCustomCurrentProductSuccess(result));
        successCallback();
    } catch (e) {
      dispatchError(dispatch, e, loadingCustomCurrentProductError);
    }
  };
};
