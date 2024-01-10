import {
  ILoginAction,
  AuthActionTypes,
  IUpdateRegistrationInfo,
  IChangeTabAction,
  IRegistrationAddProductsInfoAction,
  IRegistrationAddCustomProductsInfoAction,
  IAuthAction,
} from 'actions/auth';
import { combineReducers } from 'helpers/redux';
import { IRegistrationData, IUser, TypeTab } from 'interfaces/auth';
import { Action } from 'redux';
import { IGeneralNomenclatureItem } from 'interfaces/nomenclature';

export interface IAuthState {
  isLoading: boolean;
  userLogIn: boolean;
  isError: boolean;
  errorMessage: string;
  tab: TypeTab;
  userRegInfo: IRegistrationData;
  user: IUser;
  mailHasBeenSent: boolean;
  passwordHasBeenChange: boolean;
}

export const initState: IAuthState = {
  isLoading: false,
  userLogIn: false,
  isError: false,
  errorMessage: '',
  tab: 0,
  userRegInfo: {
    username: '',
    name: '',
    email: '',
    status: undefined,
    mobile_phone: '',
    work_phone: '',
    password1: '',
    password2: '',
    company: {
      name: '',
      trade_type: 'seller',
      ownership: undefined,
      payer_id: '',
      legal_address: '',
      actual_address: '',
      office_phone: '',
      office_email: '',
      country: undefined,
    },
    products_for_buy: [],
    products_for_sell: [],
    products_add: [],
  },
  user: {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    id: 0,
  },
  mailHasBeenSent: false,
  passwordHasBeenChange: false,
};

function authUser(state = initState, action: IAuthAction): IAuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userLogIn: true,
      };
    case AuthActionTypes.AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userLogIn: true,
        userRegInfo: action.payload,
      };
  }
  return state;
}

function recoverPasswordReducer(state = initState, action: ILoginAction): IAuthState {
  switch (action.type) {
    case AuthActionTypes.EMAIL_SUCCESS:
      return { ...state, mailHasBeenSent: true };
  }
  return state;
}

function newPasswordReducer(state = initState, action: ILoginAction): IAuthState {
  switch (action.type) {
    case AuthActionTypes.CREATE_NEW_PASSWORD_SUCCESS:
      return { ...state, passwordHasBeenChange: true };
  }
  return state;
}

function registerReducer(state = initState, action: IUpdateRegistrationInfo): IAuthState {
  switch (action.type) {
    case AuthActionTypes.UPDATE_REGISTRATION_INFO:
      return {
        ...state,
        userRegInfo: {
          ...state.userRegInfo,
          ...action.payload,
          company: {
            ...state.userRegInfo.company,
            ...action.payload.company,
          },
        },
      };
    case AuthActionTypes.REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case AuthActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
  }
  return state;
}

function emailConfirmReducer(state = initState, action: Action): IAuthState {
  switch (action.type) {
    case AuthActionTypes.CONFIRM_EMAIL_SUCCESS:
      return { ...state, userLogIn: true };
  }
  return state;
}

function registrationAddProductsReducer(state = initState, action: IRegistrationAddProductsInfoAction): IAuthState {
  switch (action.type) {
    case AuthActionTypes.LOADING_PRODUCTS_FOR_SALE_REQUEST:
      return { ...state, isLoading: true };
    case AuthActionTypes.ADD_NOMENCLATURE_FOR_BUY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userRegInfo: {
          ...state.userRegInfo,
          products_for_buy: state.userRegInfo.products_for_buy && [
            ...state.userRegInfo.products_for_buy,
            action.payload,
          ],
        },
      };
    case AuthActionTypes.DELETE_NOMENCLATURE_FOR_BUY_SUCCESS:
      const productForBuy = state.userRegInfo.products_for_buy && [...state.userRegInfo.products_for_buy];
      const newArrayForBuy =
        productForBuy && productForBuy.filter((item: IGeneralNomenclatureItem) => item.id !== action.payload.id);

      return {
        ...state,
        isLoading: false,
        userRegInfo: {
          ...state.userRegInfo,
          products_for_buy: state.userRegInfo.products_for_buy && newArrayForBuy,
        },
      };
    case AuthActionTypes.ADD_NOMENCLATURE_FOR_SELL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userRegInfo: {
          ...state.userRegInfo,
          products_for_sell: state.userRegInfo.products_for_sell && [
            ...state.userRegInfo.products_for_sell,
            action.payload,
          ],
        },
      };
    case AuthActionTypes.DELETE_NOMENCLATURE_FOR_SELL_SUCCESS:
      const productForSell = state.userRegInfo.products_for_sell && [...state.userRegInfo.products_for_sell];
      const newArrayForSell =
        productForSell && productForSell.filter((item: IGeneralNomenclatureItem) => item.id !== action.payload.id);
      return {
        ...state,
        isLoading: false,
        userRegInfo: {
          ...state.userRegInfo,
          products_for_sell: state.userRegInfo.products_for_sell && newArrayForSell,
        },
      };
  }
  return state;
}

function registrationAddCustomProductsReducer(
  state = initState,
  action: IRegistrationAddCustomProductsInfoAction
): IAuthState {
  switch (action.type) {
    case AuthActionTypes.ADD_CUSTOM_NOMENCLATURE:
      return {
        ...state,
        isLoading: false,
        userRegInfo: {
          ...state.userRegInfo,
          products_add: state.userRegInfo.products_add && [...state.userRegInfo.products_add, action.payload],
        },
      };
    case AuthActionTypes.DELETE_CUSTOM_NOMENCLATURE:
      const products_add = state.userRegInfo.products_add && [...state.userRegInfo.products_add];
      const newArray = products_add && products_add.filter((item) => item.name !== action.payload.name);
      return {
        ...state,
        isLoading: false,
        userRegInfo: {
          ...state.userRegInfo,
          products_add: newArray,
        },
      };
  }
  return state;
}

function tabReducer(state = initState, action: IChangeTabAction): IAuthState {
  switch (action.type) {
    case AuthActionTypes.ON_CHANGE_TAB_SUCCESS:
      return {
        ...state,
        tab: action.payload,
      };
  }
  return state;
}

const authReducers = (state: IAuthState, action: Action) =>
  combineReducers(
    state,
    action,
    recoverPasswordReducer,
    newPasswordReducer,
    registerReducer,
    emailConfirmReducer,
    tabReducer,
    registrationAddProductsReducer,
    registrationAddCustomProductsReducer,
    authUser
  );
export default authReducers;
