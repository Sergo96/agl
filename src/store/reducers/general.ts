import { GeneralActionTypes, ICountryListAction, IOwnershipListAction, IStatusListAction, IUnitsListAction } from 'actions/general';
import { combineReducers } from 'helpers/redux';
import { ICountry, IBaseDTO } from 'interfaces/general';
import { Action } from 'redux';

export interface IGeneralState {
  isLoading: boolean;
  countryList: ICountry[];
  ownershipList: IBaseDTO[];
  statusList: IBaseDTO[];
  unitsList: IBaseDTO[];
}

export const initState: IGeneralState = {
  isLoading: false,
  countryList: [],
  ownershipList: [],
  statusList: [],
  unitsList: []
};

function countryListReducer(state = initState, action: ICountryListAction): IGeneralState {
  switch (action.type) {
    case GeneralActionTypes.LOADING_COUNTRY_LIST_REQUEST:
      return { ...state, isLoading: true };
    case GeneralActionTypes.LOADING_COUNTRY_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        countryList: action.countryList ? action.countryList : [],
      };
  }
  return state;
}

function ownershipListReducer(state = initState, action: IOwnershipListAction): IGeneralState {
  switch (action.type) {
    case GeneralActionTypes.LOADING_OWNERSHIP_LIST_REQUEST:
      return { ...state, isLoading: true };
    case GeneralActionTypes.LOADING_OWNERSHIP_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ownershipList: action.ownershipList ? action.ownershipList : [],
      };
  }
  return state;
}

function statusListReducer(state = initState, action: IStatusListAction): IGeneralState {
  switch (action.type) {
    case GeneralActionTypes.LOADING_STATUS_LIST_REQUEST:
      return { ...state, isLoading: true };
    case GeneralActionTypes.LOADING_STATUS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        statusList: action.statusList ? action.statusList : [],
      };
  }
  return state;
}

function unitsListReducer(state = initState, action: IUnitsListAction): IGeneralState {
  switch (action.type) {
    case GeneralActionTypes.LOADING_UNITS_LIST_REQUEST:
      return { ...state, isLoading: true };
    case GeneralActionTypes.LOADING_UNITS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        unitsList: action.unitsList ? action.unitsList : [],
      };
  }
  return state;
}

const generalReducers = (state: IGeneralState, action: Action) =>
  combineReducers(state, action, countryListReducer, ownershipListReducer, statusListReducer, unitsListReducer);
export default generalReducers;
