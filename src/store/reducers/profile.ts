import { ICompanyInfoProfileAction, IProductsAction, IUserProfileAction, ProfileActionTypes } from 'actions/profile';
import { IAvatar, ICompanyProfileInfo, IDocument, IPostUsername, IUserProfileInfo } from 'interfaces/profile';
import { Action } from 'redux';
import { combineReducers } from 'helpers/redux';
import { IGeneralNomenclatureItem } from 'interfaces/nomenclature';

export interface IProfileState {
  isLoading: boolean;
  companyInfo: ICompanyProfileInfo;
  userInfo: IUserProfileInfo;
  document: IDocument;
  avatar: IAvatar;
  username: IPostUsername;
  products_for_buy: IGeneralNomenclatureItem[];
  products_for_sell: IGeneralNomenclatureItem[];
  products_add: IGeneralNomenclatureItem[];
}

export const initState: IProfileState = {
  isLoading: false,
  companyInfo: {
    name: '',
    trade_type: 'seller',
    country: {
      available_for_user: true,
      id: 0,
      name: '',
    },
    field_of_activity: '',
    ownership: {
      id: 1,
      name: '',
    },
    date_create: 0,
    payer_id: '',
    legal_address: '',
    actual_address: '',
    office_phone: '',
    office_email: '',
    description_company: '',
  },
  userInfo: {
    name: '',
    email: '',
    status: {
      id: 0,
      name: '',
    },
    mobile_phone: '',
    work_phone: '',
  },
  document: {
    document: '',
    id: 0,
  },
  avatar: {
    avatar: '',
    id: 0,
  },
  username: {
    username: '',
    password: '',
    password_confirm: '',
  },
  products_for_buy: [],
  products_for_sell: [],
  products_add: [],
};

function companyInfoReducer(state = initState, action: ICompanyInfoProfileAction): IProfileState {
  switch (action.type) {
    case ProfileActionTypes.UPDATE_COMPANY_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ProfileActionTypes.UPDATE_COMPANY_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case ProfileActionTypes.GET_COMPANY_PROFILE_INFO_REQUEST:
      return { ...state, isLoading: true };
    case ProfileActionTypes.GET_COMPANY_PROFILE_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        companyInfo: action.companyInfo ? action.companyInfo : state.companyInfo,
      };

    case ProfileActionTypes.GET_AVATAR_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ProfileActionTypes.GET_AVATAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        avatar: action.avatar ? action.avatar : state.avatar,
      };

    case ProfileActionTypes.UPDATE_AVATAR_REQUEST:
      return { ...state, isLoading: true };
    case ProfileActionTypes.UPDATE_AVATAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        avatar: action.avatar ? action.avatar : state.avatar,
      };
  }
  return state;
}

function userInfoReducer(state = initState, action: IUserProfileAction): IProfileState {
  switch (action.type) {
    case ProfileActionTypes.GET_USER_PROFILE_INFO_REQUEST:
      return { ...state, isLoading: true };
    case ProfileActionTypes.GET_USER_PROFILE_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: action.userInfo ? action.userInfo : state.userInfo,
      };

    case ProfileActionTypes.UPDATE_USER_PROFILE_REQUEST:
      return { ...state, isLoading: true };
    case ProfileActionTypes.UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: action.userInfo ? action.userInfo : state.userInfo,
      };

    case ProfileActionTypes.GET_PROFILE_DOCUMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ProfileActionTypes.GET_PROFILE_DOCUMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        document: action.document ? action.document : state.document,
      };

    case ProfileActionTypes.UPDATE_PROFILE_DOCUMENT_REQUEST:
      return { ...state, isLoading: true };
    case ProfileActionTypes.UPDATE_PROFILE_DOCUMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        document: action.document ? action.document : state.document,
      };

    case ProfileActionTypes.UPDATE_PROFILE_USERNAME_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ProfileActionTypes.UPDATE_PROFILE_USERNAME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        username: action.username ? action.username : state.username,
      };

    case ProfileActionTypes.GET_PROFILE_USERNAME_REQUEST:
      return { ...state, isLoading: true };
    case ProfileActionTypes.GET_PROFILE_USERNAME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        username: action.username ? action.username : state.username,
      };
  }
  return state;
}

function profileProductsReducer(state = initState, action: IProductsAction): IProfileState {
  switch (action.type) {
    case ProfileActionTypes.GET_PROFILE_PRODUCTS_FOR_BUY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ProfileActionTypes.GET_PROFILE_PRODUCTS_FOR_BUY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products_for_buy: action.products_for_buy ? action.products_for_buy : state.products_for_buy,
      };

    case ProfileActionTypes.GET_PROFILE_FOR_SALE_REQUEST:
      return { ...state, isLoading: true };
    case ProfileActionTypes.GET_PRODUCTS_FOR_SALE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products_for_sell: action.products_for_sell ? action.products_for_sell : state.products_for_sell,
      };

    case ProfileActionTypes.ADD_PROFILE_NOMENCLATURE_FOR_BUY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products_for_buy: action.products_add
          ? [...state.products_for_buy, action.products_add]
          : state.products_for_buy,
      };
    case ProfileActionTypes.DELETE_PROFILE_NOMENCLATURE_FOR_BUY_SUCCESS:
      const productForBuy = state.products_for_buy && [...state.products_for_buy];
      const newArrayForBuy =
        productForBuy &&
        productForBuy.filter(
          (item: IGeneralNomenclatureItem) => action.products_add && item.id !== action.products_add.id
        );

      return {
        ...state,
        isLoading: false,
        products_for_buy: state.products_for_buy && newArrayForBuy,
      };
    case ProfileActionTypes.ADD_PROFILE_NOMENCLATURE_FOR_SELL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products_for_sell: action.products_add
          ? [...state.products_for_sell, action.products_add]
          : state.products_for_sell,
      };
    case ProfileActionTypes.DELETE_PROFILE_NOMENCLATURE_FOR_SELL_SUCCESS:
      const productForSell = state.products_for_sell && [...state.products_for_sell];
      const newArrayForSell =
        productForSell &&
        productForSell.filter(
          (item: IGeneralNomenclatureItem) => action.products_add && item.id !== action.products_add.id
        );
      return {
        ...state,
        isLoading: false,
        products_for_sell: state.products_for_sell && newArrayForSell,
      };

    case ProfileActionTypes.ADD_PROFILE_CUSTOM_NOMENCLATURE:
      return {
        ...state,
        isLoading: false,
        products_add: action.products_custom_add
          ? [...state.products_add, action.products_custom_add]
          : state.products_add,
      };
    case ProfileActionTypes.DELETE_PROFILE_CUSTOM_NOMENCLATURE:
      const products_add = state.products_add && [...state.products_add];
      const newArray =
        products_add &&
        products_add.filter((item) => action.products_custom_add && item.name !== action.products_custom_add.name);
      return {
        ...state,
        isLoading: false,
        products_add: newArray,
      };

    case ProfileActionTypes.UPDATE_PROFILE_PRODUCTS_FOR_BUY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ProfileActionTypes.UPDATE_PROFILE_PRODUCTS_FOR_BUY_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case ProfileActionTypes.UPDATE_PROFILE_PRODUCTS_FOR_SELL_REQUEST:
      return { ...state, isLoading: true };
    case ProfileActionTypes.UPDATE_PROFILE_PRODUCTS_FOR_SELL_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
  }
  return state;
}

const profileReducers = (state: IProfileState, action: Action) =>
  combineReducers(state, action, companyInfoReducer, userInfoReducer, profileProductsReducer);

export default profileReducers;
