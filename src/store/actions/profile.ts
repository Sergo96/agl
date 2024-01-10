import {
  getProfileAvatar,
  getCompanyProfileInfo,
  getUserProfileInfo,
  putProfileAvatar,
  putCompanyProfileInfo,
  postProfileDocument,
  putUserProfileInfo,
  getProfileDocument,
  getProfileProductsForBuy,
  putProfileProductsForBuy,
  putProfileUsernameChange,
  getProfileUsername,
  getProfileProductsForSell,
  putProfileProductsForSell,
} from 'api/profile';
import AysAgroError from 'entries/errors';
import { makeSuccessNotificationEntry } from 'entries/notifications';
import IErrorAction from 'interfaces/errors';
import { TypeTab } from 'interfaces/auth';
import { IGeneralNomenclatureItem } from 'interfaces/nomenclature';
import { IAvatar, ICompanyProfileInfo, IDocument, IPostUsername, IUserProfileInfo } from 'interfaces/profile';
import { Action, ActionCreator, Dispatch } from 'redux';
import {
  profileCustomNomenclatureSelector,
  profileProductsForBuySelector,
  profileProductsForSellSelector,
} from 'selectors/profile';

import { IAysAgroState } from 'store';
import { dispatchError, dispatchNotification } from './notifications';

export enum ProfileActionTypes {
  GET_COMPANY_PROFILE_INFO_REQUEST = 'GET_COMPANY_PROFILE_INFO_REQUEST',
  GET_COMPANY_PROFILE_INFO_SUCCESS = 'GET_COMPANY_PROFILE_INFO_SUCCESS',
  UPDATE_COMPANY_PROFILE_REQUEST = 'UPDATE_COMPANY_PROFILE_REQUEST',
  UPDATE_COMPANY_PROFILE_SUCCESS = 'UPDATE_COMPANY_PROFILE_SUCCESS',
  GET_USER_PROFILE_INFO_REQUEST = 'GET_USER_PROFILE_INFO_REQUEST',
  GET_USER_PROFILE_INFO_SUCCESS = 'GET_USER_PROFILE_INFO_SUCCESS',
  UPDATE_USER_PROFILE_REQUEST = 'UPDATE_USER_PROFILE_REQUEST',
  UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS',
  GET_PROFILE_DOCUMENT_REQUEST = 'GET_PROFILE_DOCUMENT_REQUEST',
  GET_PROFILE_DOCUMENT_SUCCESS = 'GET_PROFILE_DOCUMENT_SUCCESS',
  UPDATE_PROFILE_DOCUMENT_REQUEST = 'UPDATE_PROFILE_DOCUMENT_REQUEST',
  UPDATE_PROFILE_DOCUMENT_SUCCESS = 'UPDATE_PROFILE_DOCUMENT_SUCCESS',
  GET_AVATAR_REQUEST = 'GET_AVATAR_REQUEST',
  GET_AVATAR_SUCCESS = 'GET_AVATAR_SUCCESS',
  UPDATE_AVATAR_REQUEST = 'UPDATE_AVATAR_REQUEST',
  UPDATE_AVATAR_SUCCESS = 'UPDATE_AVATAR_SUCCESS',
  GET_PROFILE_PRODUCTS_FOR_BUY_REQUEST = 'GET_PROFILE_PRODUCTS_FOR_BUY_REQUEST',
  GET_PROFILE_PRODUCTS_FOR_BUY_SUCCESS = 'GET_PROFILE_PRODUCTS_FOR_BUY_SUCCESS',
  GET_PROFILE_FOR_SALE_REQUEST = 'GET_PROFILE_FOR_SALE_REQUEST',
  GET_PRODUCTS_FOR_SALE_SUCCESS = 'GET_PRODUCTS_FOR_SALE_SUCCESS',
  UPDATE_PROFILE_PRODUCTS_FOR_BUY_REQUEST = 'UPDATE_PROFILE_PRODUCTS_FOR_BUY_REQUEST',
  UPDATE_PROFILE_PRODUCTS_FOR_BUY_SUCCESS = 'UPDATE_PROFILE_PRODUCTS_FOR_BUY_SUCCESS',
  UPDATE_PROFILE_PRODUCTS_FOR_SELL_REQUEST = 'UPDATE_PROFILE_PRODUCTS_FOR_SELL_REQUEST',
  UPDATE_PROFILE_PRODUCTS_FOR_SELL_SUCCESS = 'UPDATE_PROFILE_PRODUCTS_FOR_SELL_SUCCESS',
  ADD_PROFILE_NOMENCLATURE_FOR_BUY_SUCCESS = 'ADD_PROFILE_NOMENCLATURE_FOR_BUY_SUCCESS',
  DELETE_PROFILE_NOMENCLATURE_FOR_BUY_SUCCESS = 'DELETE_PROFILE_NOMENCLATURE_FOR_BUY_SUCCESS',
  ADD_PROFILE_NOMENCLATURE_FOR_SELL_SUCCESS = 'ADD_PROFILE_NOMENCLATURE_FOR_SELL_SUCCESS',
  DELETE_PROFILE_NOMENCLATURE_FOR_SELL_SUCCESS = 'DELETE_PROFILE_NOMENCLATURE_FOR_SELL_SUCCESS',
  ADD_PROFILE_CUSTOM_NOMENCLATURE = 'ADD_PROFILE_CUSTOM_NOMENCLATURE',
  DELETE_PROFILE_CUSTOM_NOMENCLATURE = 'DELETE_PROFILE_CUSTOM_NOMENCLATURE',
  GET_PROFILE_USERNAME_REQUEST = 'GET_PROFILE_USERNAME_REQUEST',
  GET_PROFILE_USERNAME_SUCCESS = 'GET_PROFILE_USERNAME_SUCCESS',
  UPDATE_PROFILE_USERNAME_REQUEST = 'UPDATE_PROFILE_USERNAME_REQUEST',
  UPDATE_PROFILE_USERNAME_SUCCESS = 'UPDATE_PROFILE_USERNAME_SUCCESS',
  REQUEST_ERROR = 'REQUEST_ERROR',
}

export interface ICompanyInfoProfileAction extends IErrorAction {
  companyInfo?: ICompanyProfileInfo;
  avatar?: IAvatar;
}

export interface IUserProfileAction extends IErrorAction {
  userInfo?: IUserProfileInfo;
  document?: IDocument;
  username?: IPostUsername;
}

export interface IProductsAction extends IErrorAction {
  products_for_buy?: IGeneralNomenclatureItem[];
  products_for_sell?: IGeneralNomenclatureItem[];
  products_add?: IGeneralNomenclatureItem;
  products_custom_add?: IGeneralNomenclatureItem;
}

const updateCompanyProfileRequest: ActionCreator<Action> = () => {
  return { type: ProfileActionTypes.UPDATE_COMPANY_PROFILE_REQUEST };
};

const updateCompanyProfileSuccess: ActionCreator<ICompanyInfoProfileAction> = () => {
  return { type: ProfileActionTypes.UPDATE_COMPANY_PROFILE_SUCCESS };
};

const requestError: ActionCreator<Action> = (error: AysAgroError) => {
  return { type: ProfileActionTypes.REQUEST_ERROR, error };
};

export const updateCompanyProfile = (data: ICompanyProfileInfo, notification: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(updateCompanyProfileRequest());
    try {
      const companyInfo = await putCompanyProfileInfo(data);
      dispatch(updateCompanyProfileSuccess(companyInfo));
      dispatchNotification(dispatch, makeSuccessNotificationEntry(notification));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};

const loadingCompanyInfoRequest: ActionCreator<Action> = () => {
  return { type: ProfileActionTypes.GET_COMPANY_PROFILE_INFO_REQUEST };
};

const loadingCompanyInfoSuccess: ActionCreator<ICompanyInfoProfileAction> = (companyInfo: ICompanyProfileInfo) => {
  return { type: ProfileActionTypes.GET_COMPANY_PROFILE_INFO_SUCCESS, companyInfo };
};

export const loadingCompanyInfo = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingCompanyInfoRequest());
    try {
      const companyInfo = await getCompanyProfileInfo();
      dispatch(loadingCompanyInfoSuccess(companyInfo));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};

const loadingProfileUserInfoRequest: ActionCreator<Action> = () => {
  return { type: ProfileActionTypes.GET_USER_PROFILE_INFO_REQUEST };
};

const loadingProfileUserInfoSuccess: ActionCreator<IUserProfileAction> = (userInfo: IUserProfileInfo) => {
  return { type: ProfileActionTypes.GET_USER_PROFILE_INFO_SUCCESS, userInfo };
};

export const loadingUserInfo = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingProfileUserInfoRequest());
    try {
      const userInfo = await getUserProfileInfo();
      dispatch(loadingProfileUserInfoSuccess(userInfo));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};

const updateUserInfoRequest: ActionCreator<Action> = () => {
  return { type: ProfileActionTypes.UPDATE_USER_PROFILE_REQUEST };
};

const updateUserInfoSuccess: ActionCreator<IUserProfileAction> = (userInfo: IUserProfileInfo) => {
  return { type: ProfileActionTypes.UPDATE_USER_PROFILE_SUCCESS, userInfo };
};

export const updateUserInfo = (data: IUserProfileInfo, notification: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(updateUserInfoRequest());
    try {
      const userInfo = await putUserProfileInfo(data);
      dispatch(updateUserInfoSuccess(userInfo));
      dispatchNotification(dispatch, makeSuccessNotificationEntry(notification));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};

const loadingDocumentRequest: ActionCreator<Action> = () => {
  return { type: ProfileActionTypes.GET_PROFILE_DOCUMENT_REQUEST };
};

const loadingDocumentSuccess: ActionCreator<IUserProfileAction> = (document: IDocument) => {
  return { type: ProfileActionTypes.GET_PROFILE_DOCUMENT_SUCCESS, document };
};

export const loadingDocumentInfo = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingDocumentRequest());
    try {
      const document = await getProfileDocument();
      dispatch(loadingDocumentSuccess(document));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};

const addDocumentRequest: ActionCreator<Action> = () => {
  return { type: ProfileActionTypes.UPDATE_PROFILE_DOCUMENT_REQUEST };
};

const addDocumentSuccess: ActionCreator<IUserProfileAction> = (document: IDocument) => {
  return { type: ProfileActionTypes.UPDATE_PROFILE_DOCUMENT_SUCCESS, document };
};

export const addDocument = (data: FormData, notification: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(addDocumentRequest());
    try {
      const document = await postProfileDocument(data);
      dispatch(addDocumentSuccess(document));
      dispatchNotification(dispatch, makeSuccessNotificationEntry(notification));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};

const loadingAvatarRequest: ActionCreator<Action> = () => {
  return { type: ProfileActionTypes.GET_AVATAR_REQUEST };
};

const loadingAvatarSuccess: ActionCreator<ICompanyInfoProfileAction> = (avatar: IAvatar) => {
  return { type: ProfileActionTypes.GET_AVATAR_SUCCESS, avatar };
};

export const loadingAvatarInfo = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingAvatarRequest());
    try {
      const avatarUrl = await getProfileAvatar();
      dispatch(loadingAvatarSuccess(avatarUrl));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};

const updateAvatarRequest: ActionCreator<Action> = () => {
  return { type: ProfileActionTypes.UPDATE_AVATAR_REQUEST };
};

const updateAvatarSuccess: ActionCreator<ICompanyInfoProfileAction> = (avatar: IAvatar) => {
  return { type: ProfileActionTypes.GET_AVATAR_SUCCESS, avatar };
};

export const updateAvatar = (data: FormData, notification: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(updateAvatarRequest());
    try {
      const avatar = await putProfileAvatar(data);
      dispatch(updateAvatarSuccess(avatar));
      dispatchNotification(dispatch, makeSuccessNotificationEntry(notification));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};

const loadingProductsForBuyRequest: ActionCreator<Action> = () => {
  return { type: ProfileActionTypes.GET_PROFILE_PRODUCTS_FOR_BUY_REQUEST };
};

const loadingProductsForBuySuccess: ActionCreator<IProductsAction> = (products_for_buy: IGeneralNomenclatureItem[]) => {
  return { type: ProfileActionTypes.GET_PROFILE_PRODUCTS_FOR_BUY_SUCCESS, products_for_buy };
};

export const loadingProductsForBuy = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingProductsForBuyRequest());
    try {
      const productsForBuy = await getProfileProductsForBuy();
      const productsForBuyArr = productsForBuy.products_for_buy;
      dispatch(loadingProductsForBuySuccess(productsForBuyArr));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};

const loadingProductsForSellRequest: ActionCreator<Action> = () => {
  return { type: ProfileActionTypes.GET_PROFILE_FOR_SALE_REQUEST };
};

const loadingProductsForSellSuccess: ActionCreator<IProductsAction> = (
  products_for_sell: IGeneralNomenclatureItem[]
) => {
  return { type: ProfileActionTypes.GET_PRODUCTS_FOR_SALE_SUCCESS, products_for_sell };
};

export const loadingProductsForSell = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingProductsForSellRequest());
    try {
      const productsForSale = await getProfileProductsForSell();
      const productsForSaleArr = productsForSale.products_for_sell;
      dispatch(loadingProductsForSellSuccess(productsForSaleArr));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};

export const addProfileNomenclatureForBuySuccess: ActionCreator<IProductsAction> = (
  products_add: IGeneralNomenclatureItem
) => {
  return { type: ProfileActionTypes.ADD_PROFILE_NOMENCLATURE_FOR_BUY_SUCCESS, products_add };
};

export const deleteProfileNomenclatureForBuySuccess: ActionCreator<IProductsAction> = (
  products_add: IGeneralNomenclatureItem
) => {
  return { type: ProfileActionTypes.DELETE_PROFILE_NOMENCLATURE_FOR_BUY_SUCCESS, products_add };
};

export const addProfileNomenclatureForSellSuccess: ActionCreator<IProductsAction> = (
  products_add: IGeneralNomenclatureItem
) => {
  return { type: ProfileActionTypes.ADD_PROFILE_NOMENCLATURE_FOR_SELL_SUCCESS, products_add };
};

export const deleteProfileNomenclatureForSellSuccess: ActionCreator<IProductsAction> = (
  products_add: IGeneralNomenclatureItem
) => {
  return { type: ProfileActionTypes.DELETE_PROFILE_NOMENCLATURE_FOR_SELL_SUCCESS, products_add };
};

export const addProfileNomenclature = (data: IGeneralNomenclatureItem, type: TypeTab) => {
  return (dispatch: Dispatch, getState: () => IAysAgroState) => {
    const state = getState();
    const nomenclatureForBuy = profileProductsForBuySelector(state);
    const nomenclatureForSell = profileProductsForSellSelector(state);

    if (type === 0) {
      if (nomenclatureForBuy && nomenclatureForBuy.some((i) => i.id === data.id)) {
        dispatch(deleteProfileNomenclatureForBuySuccess(data));
      } else {
        dispatch(addProfileNomenclatureForBuySuccess(data));
      }
    } else if (type === 1) {
      if (nomenclatureForSell && nomenclatureForSell.some((i) => i.id === data.id)) {
        dispatch(deleteProfileNomenclatureForSellSuccess(data));
      } else {
        dispatch(addProfileNomenclatureForSellSuccess(data));
      }
    }
  };
};

const deleteProfileCustomNomenclatureSuccess: ActionCreator<IProductsAction> = (
  products_custom_add: IGeneralNomenclatureItem
) => {
  return { type: ProfileActionTypes.DELETE_PROFILE_CUSTOM_NOMENCLATURE, products_custom_add };
};

const addProfileCustomNomenclatureSuccess: ActionCreator<IProductsAction> = (
  products_custom_add: IGeneralNomenclatureItem
) => {
  return { type: ProfileActionTypes.ADD_PROFILE_CUSTOM_NOMENCLATURE, products_custom_add };
};

export const addProfileCustomNomenclature = (data: IGeneralNomenclatureItem, type: TypeTab) => {
  return (dispatch: Dispatch, getState: () => IAysAgroState) => {
    const state = getState();
    const customNomenclature = profileCustomNomenclatureSelector(state);
    if (type === 0) {
      if (customNomenclature && customNomenclature.some((i) => i.name === data.name)) {
        dispatch(deleteProfileCustomNomenclatureSuccess(data));
      } else {
        dispatch(addProfileCustomNomenclatureSuccess(data));
      }
    } else {
      if (customNomenclature && customNomenclature.some((i) => i.name === data.name)) {
        dispatch(deleteProfileNomenclatureForBuySuccess(data));
      } else {
        dispatch(addProfileCustomNomenclatureSuccess(data));
      }
    }
  };
};

const updateProductsForBuyRequest: ActionCreator<Action> = () => {
  return { type: ProfileActionTypes.UPDATE_PROFILE_PRODUCTS_FOR_BUY_REQUEST };
};

const updateProductsForBuySuccess: ActionCreator<IProductsAction> = (products_for_buy: IGeneralNomenclatureItem[]) => {
  return { type: ProfileActionTypes.UPDATE_PROFILE_PRODUCTS_FOR_BUY_SUCCESS, products_for_buy };
};

export const updateProductsForBuy = (data: IGeneralNomenclatureItem[], notification: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(updateProductsForBuyRequest());
    try {
      const products = await putProfileProductsForBuy(data);
      dispatch(updateProductsForBuySuccess(products));
      dispatchNotification(dispatch, makeSuccessNotificationEntry(notification));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};

const updateProductsForSellRequest: ActionCreator<Action> = () => {
  return { type: ProfileActionTypes.UPDATE_PROFILE_PRODUCTS_FOR_SELL_REQUEST };
};

const updateProductsForSellSuccess: ActionCreator<IProductsAction> = (
  products_for_sell: IGeneralNomenclatureItem[]
) => {
  return { type: ProfileActionTypes.UPDATE_PROFILE_PRODUCTS_FOR_SELL_SUCCESS, products_for_sell };
};

export const updateProductsForSell = (data: IGeneralNomenclatureItem[], notification: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(updateProductsForSellRequest());
    try {
      const products = await putProfileProductsForSell(data);
      dispatch(updateProductsForSellSuccess(products));
      dispatchNotification(dispatch, makeSuccessNotificationEntry(notification));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};

const loadingUsernameRequest: ActionCreator<Action> = () => {
  return { type: ProfileActionTypes.GET_PROFILE_USERNAME_REQUEST };
};

const loadingUsernameSuccess: ActionCreator<IUserProfileAction> = (username: IPostUsername) => {
  return { type: ProfileActionTypes.GET_PROFILE_USERNAME_SUCCESS, username };
};

export const loadingUsername = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingUsernameRequest());
    try {
      const username = await getProfileUsername();
      dispatch(loadingUsernameSuccess(username));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};

const updateUsernameRequest: ActionCreator<Action> = () => {
  return { type: ProfileActionTypes.UPDATE_PROFILE_USERNAME_REQUEST };
};

const updateUsernameSuccess: ActionCreator<IUserProfileAction> = () => {
  return { type: ProfileActionTypes.UPDATE_PROFILE_USERNAME_SUCCESS };
};

export const updateUsername = (data: IPostUsername, notification: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(updateUsernameRequest());
    try {
      const username = await putProfileUsernameChange(data);
      dispatch(updateUsernameSuccess(username));
      dispatchNotification(dispatch, makeSuccessNotificationEntry(notification));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};
