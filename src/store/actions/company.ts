import { ActionCreator, Action, Dispatch } from 'redux';
import { dispatchError } from './notifications';
import IErrorAction from 'interfaces/errors';
import { ICompanyData } from 'interfaces/company';
import { getCompanyById } from 'api/company';

export enum CompanyTypes {
  LOADING_COMPANY_BY_ID_REQUEST = 'LOADING_COMPANY_BY_ID_REQUEST',
  LOADING_COMPANY_BY_ID_SUCCESS = 'LOADING_COMPANY_BY_ID_SUCCESS',

  LOADING_COMPANY_ERROR = 'LOADING_COMPANY_ERROR',
}

export interface ICpmpanyStateAction extends IErrorAction {
   companyById: ICompanyData
}


const loadingProfileError: ActionCreator<Action> = () => {
  return { type: CompanyTypes.LOADING_COMPANY_ERROR };
};

const loadingCompanyByIdRequest: ActionCreator<Action> = () => {
  return { type: CompanyTypes.LOADING_COMPANY_BY_ID_REQUEST };
};

const loadingCompanyByIdSuccess: ActionCreator<ICpmpanyStateAction> = (companyById): ICpmpanyStateAction => {
  return { type: CompanyTypes.LOADING_COMPANY_BY_ID_SUCCESS, companyById };
};

export const loadingCompanyById = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingCompanyByIdRequest());
    try {
      const data = await getCompanyById(id);
      dispatch(loadingCompanyByIdSuccess(data));
    } catch (e) {
      dispatchError(dispatch, e, loadingProfileError);
    }
  };
};

