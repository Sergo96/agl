import { combineReducers } from 'helpers/redux';
import { Action } from 'redux';

import { CompanyTypes, ICpmpanyStateAction } from 'actions/company';
import { ICompanyData } from 'interfaces/company';

export interface ICompanyState {
  isLoading: boolean;
  companyById: ICompanyData  | null;
}

export const initState: ICompanyState = {
  isLoading: false,
  companyById: null
};

function companyReducer(state = initState, action: ICpmpanyStateAction): ICompanyState {
  switch (action.type) {
    case CompanyTypes.LOADING_COMPANY_BY_ID_REQUEST:
      return { ...state, isLoading: true };
    case CompanyTypes.LOADING_COMPANY_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
       companyById: action.companyById ? action.companyById : null
      };
   
  }
  return state;
}


const companyReducers = (state: ICompanyState, action: Action) =>
  combineReducers(state, action, companyReducer);
export default companyReducers;
