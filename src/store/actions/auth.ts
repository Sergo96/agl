import IErrorAction from 'interfaces/errors';
import { Action, ActionCreator, Dispatch } from 'redux';
import { IRecoverPassword, INewPassword, IRegistrationData, TypeTab } from 'interfaces/auth';
import {
  postLoginUser,
  postRecoveryByEmail,
  postResetPassword,
  postRegisterUser,
  getUserInfo,
  postConfirmEmail,
} from 'api/auth';

import { setAuthentication, deleteAuthentication } from 'storage/localStorage';
import { dispatchError, dispatchNotification } from './notifications';
import { ILoginData } from './../../types/interfaces/auth';
import { IAysAgroState } from 'store';
import {
  loadingProductsForBuySelector,
  loadingProductsForSellSelector,
  loadingCustomNomencalture,
} from 'selectors/auth';
import { IGeneralNomenclatureItem } from 'interfaces/nomenclature';
import AysAgroError from 'entries/errors';
import { NextRouter } from 'next/router';
import { makeSuccessNotificationEntry } from 'entries/notifications';
import { IBaseDTO } from 'interfaces/general';

export enum AuthActionTypes {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST',
  EMAIL_REQUEST = 'EMAIL_REQUEST',
  EMAIL_SUCCESS = 'EMAIL_SUCCESS',
  CREATE_NEW_PASSWORD_REQUEST = 'CREATE_NEW_PASSWORD_REQUEST',
  CREATE_NEW_PASSWORD_SUCCESS = 'CREATE_NEW_PASSWORD_SUCCESS',
  LOADING_PRODUCTS_FOR_SALE_REQUEST = 'LOADING_PRODUCTS_FOR_SALE_REQUEST',
  LOADING_PRODUCTS_FOR_SALE_SUCCESS = 'LOADING_PRODUCTS_FOR_SALE_SUCCESS',
  UPDATE_REGISTRATION_INFO = 'UPDATE_REGISTRATION_INFO',
  REGISTER_REQUEST = 'REGISTER_REQUEST',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  ADD_NOMENCLATURE_FOR_BUY_SUCCESS = 'ADD_NOMENCLATURE_FOR_BUY_SUCCESS',
  DELETE_NOMENCLATURE_FOR_BUY_SUCCESS = 'DELETE_NOMENCLATURE_FOR_BUY_SUCCESS',
  ADD_NOMENCLATURE_FOR_SELL_SUCCESS = 'ADD_NOMENCLATURE_FOR_SELL_SUCCESS',
  DELETE_NOMENCLATURE_FOR_SELL_SUCCESS = 'DELETE_NOMENCLATURE_FOR_SELL_SUCCESS',
  ADD_CUSTOM_NOMENCLATURE = 'ADD_CUSTOM_NOMENCLATURE',
  DELETE_CUSTOM_NOMENCLATURE = 'DELETE_CUSTOM_NOMENCLATURE',
  ON_CHANGE_TAB_SUCCESS = 'ON_CHANGE_TAB_SUCCESS',
  REQUEST_ERROR = 'REQUEST_ERROR',
  AUTH_REQUEST = 'AUTH_REQUEST',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  CONFIRM_EMAIL_REQUEST = 'CONFIRM_EMAIL_REQUEST',
  CONFIRM_EMAIL_SUCCESS = 'CONFIRM_EMAIL_SUCCESS',
}

export interface ILoginAction extends IErrorAction {
  token: string;
}
export interface IUpdateRegistrationInfo extends IErrorAction {
  payload: IRegistrationData;
}

export interface IRegistrationAddProductsInfoAction extends IErrorAction {
  payload: IGeneralNomenclatureItem;
}

export interface IRegistrationAddCustomProductsInfoAction extends IErrorAction {
  payload: IGeneralNomenclatureItem;
}

export interface IRegistrationAddProductData {
  results: IGeneralNomenclatureItem[];
}

export interface IChangeTabAction extends IErrorAction {
  payload: TypeTab;
}

export interface IAuthAction extends IErrorAction {
  payload: IRegistrationData;
}

const logInRequest: ActionCreator<Action> = () => {
  return { type: AuthActionTypes.EMAIL_REQUEST };
};

export const loginSuccess = () => {
  return { type: AuthActionTypes.LOGIN_SUCCESS };
};

const requestError: ActionCreator<Action> = (error: AysAgroError) => {
  return { type: AuthActionTypes.REQUEST_ERROR, error };
};

export const logIn = (user: ILoginData) => {
  return async (dispatch: Dispatch) => {
    dispatch(logInRequest());
    try {
      const { key } = await postLoginUser(user);
      dispatch(loginSuccess());
      setAuthentication(key);
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};


const logOutUserRequest: ActionCreator<Action> = () => {
  return { type: AuthActionTypes.LOGOUT_USER_REQUEST };
};

export const logOut = (redirect: () => void) => {
  return async (dispatch: Dispatch) => {
    dispatch(logOutUserRequest());
    deleteAuthentication()
    redirect()
  }
}

const recoverPasswordRequest: ActionCreator<Action> = () => {
  return { type: AuthActionTypes.EMAIL_REQUEST };
};

const recoverPasswordSuccess: ActionCreator<Action> = (data: string) => {
  return { type: AuthActionTypes.EMAIL_SUCCESS, data };
};

export const recoverPassword = (value: IRecoverPassword) => {
  return async (dispatch: Dispatch) => {
    dispatch(recoverPasswordRequest());
    try {
      const data = await postRecoveryByEmail(value);
      dispatch(recoverPasswordSuccess(data));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};

const createNewPasswordRequest: ActionCreator<Action> = () => {
  return { type: AuthActionTypes.CREATE_NEW_PASSWORD_REQUEST };
};

const createNewPasswordSuccess: ActionCreator<Action> = () => {
  return { type: AuthActionTypes.CREATE_NEW_PASSWORD_SUCCESS };
};

export const createNewPassword = (value: INewPassword) => {
  return async (dispatch: Dispatch) => {
    dispatch(createNewPasswordRequest());
    try {
      const token = window.localStorage.getItem('Authentication');
      const uid = '1';
      const data = { ...value, token, uid };
      const { key } = await postResetPassword(data);
      dispatch(createNewPasswordSuccess());
      setAuthentication(key);
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};

export const updateRegistrationInfo = (data: IRegistrationData) => {
  return { type: AuthActionTypes.UPDATE_REGISTRATION_INFO, payload: data };
};

const registrationRequest: ActionCreator<Action> = () => {
  return { type: AuthActionTypes.REGISTER_REQUEST };
};

export const registrationSuccess = () => {
  return { type: AuthActionTypes.REGISTER_SUCCESS };
};

export const register = (data: IRegistrationData, router: NextRouter, notification: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(registrationRequest());
    try {
      const { key } = await postRegisterUser(data);
      dispatch(registrationSuccess());
      setAuthentication(key);
      dispatchNotification(dispatch, makeSuccessNotificationEntry(notification));
      router.push('/registration-pending');
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};

export const addNomenclatureForBuySuccess: ActionCreator<IRegistrationAddProductsInfoAction> = (
  data: IGeneralNomenclatureItem
) => {
  return { type: AuthActionTypes.ADD_NOMENCLATURE_FOR_BUY_SUCCESS, payload: data };
};

export const deleteNomenclatureForBuySuccess: ActionCreator<IRegistrationAddProductsInfoAction> = (
  data: IGeneralNomenclatureItem
) => {
  return { type: AuthActionTypes.DELETE_NOMENCLATURE_FOR_BUY_SUCCESS, payload: data };
};

export const addNomenclatureForSellSuccess: ActionCreator<IRegistrationAddProductsInfoAction> = (
  data: IGeneralNomenclatureItem
) => {
  return { type: AuthActionTypes.ADD_NOMENCLATURE_FOR_SELL_SUCCESS, payload: data };
};

export const deleteNomenclatureForSellSuccess: ActionCreator<IRegistrationAddProductsInfoAction> = (
  data: IGeneralNomenclatureItem
) => {
  return { type: AuthActionTypes.DELETE_NOMENCLATURE_FOR_SELL_SUCCESS, payload: data };
};

export const addNomenclature = (data: IBaseDTO, type: TypeTab) => {
  return (dispatch: Dispatch, getState: () => IAysAgroState) => {
    const state = getState();
    const nomenclatureForBuy = loadingProductsForBuySelector(state);
    const nomenclatureForSell = loadingProductsForSellSelector(state);
    if (type === 0) {
      if (nomenclatureForBuy && nomenclatureForBuy.some((i) => i.id === data.id)) {
        dispatch(deleteNomenclatureForBuySuccess(data));
      } else {
        dispatch(addNomenclatureForBuySuccess(data));
      }
    } else if (type === 1) {
      if (nomenclatureForSell && nomenclatureForSell.some((i) => i.id === data.id)) {
        dispatch(deleteNomenclatureForSellSuccess(data));
      } else {
        dispatch(addNomenclatureForSellSuccess(data));
      }
    }
  };
};

export const addCustomNomenclature = (data: IGeneralNomenclatureItem, type: TypeTab) => {
  return (dispatch: Dispatch, getState: () => IAysAgroState) => {
    const state = getState();
    const customNomenclature = loadingCustomNomencalture(state);

    if (type === 0) {
      if (customNomenclature && customNomenclature.some((i) => i.name === data.name)) {
        dispatch(deleteCustomNomenclatureSuccess(data));
      } else {
        dispatch(addCustomNomenclatureSuccess(data));
      }
    } else {
      if (customNomenclature && customNomenclature.some((i) => i.name === data.name)) {
        dispatch(deleteNomenclatureForBuySuccess(data));
      } else {
        dispatch(addCustomNomenclatureSuccess(data));
      }
    }
  };
};

const deleteCustomNomenclatureSuccess: ActionCreator<IRegistrationAddCustomProductsInfoAction> = (
  data: IGeneralNomenclatureItem
) => {
  return { type: AuthActionTypes.DELETE_CUSTOM_NOMENCLATURE, payload: data };
};

const addCustomNomenclatureSuccess: ActionCreator<IRegistrationAddCustomProductsInfoAction> = (
  data: IGeneralNomenclatureItem
) => {
  return { type: AuthActionTypes.ADD_CUSTOM_NOMENCLATURE, payload: data };
};

export const onChangeTabSuccess: ActionCreator<IChangeTabAction> = (data: TypeTab) => {
  return { type: AuthActionTypes.ON_CHANGE_TAB_SUCCESS, payload: data };
};

export const onChangeTab = (value: TypeTab) => {
  return (dispatch: Dispatch) => {
    dispatch(onChangeTabSuccess(value));
  };
};

const userInfoRequest: ActionCreator<Action> = () => {
  return { type: AuthActionTypes.AUTH_REQUEST };
};

const userInfoSuccess: ActionCreator<IAuthAction> = (payload: IRegistrationData) => {
  return { type: AuthActionTypes.AUTH_SUCCESS, payload };
};

export const userInfo = () => {
  return async (dispatch: Dispatch) => {
    dispatch(userInfoRequest());
    try {
      const data = await getUserInfo();
      dispatch(userInfoSuccess(data));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};

const emailConfirmRequest: ActionCreator<Action> = () => {
  return { type: AuthActionTypes.CONFIRM_EMAIL_REQUEST };
};

const emailConfirmSuccess: ActionCreator<Action> = () => {
  return { type: AuthActionTypes.CONFIRM_EMAIL_SUCCESS };
};

export const confirmEmail = (data: string | string[], router: NextRouter) => {
  return async (dispatch: Dispatch) => {
    dispatch(emailConfirmRequest());
    try {
      const { key } = await postConfirmEmail(data);
      dispatch(emailConfirmSuccess());
      setAuthentication(key);
      router.push('/registration-success');
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};
