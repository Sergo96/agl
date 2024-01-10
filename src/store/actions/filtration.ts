import { TypeTab } from './../../types/interfaces/auth';
import { ActionCreator, Dispatch } from 'redux';
import IErrorAction from 'interfaces/errors';
import { ILotsParams} from 'interfaces/auctions';
import { IAysAgroState } from 'store';
import { auctionsFilterParamsSelector } from 'selectors/filtration';

export enum FiltrationTypes {
  SAVE_FILTER_PARAMS_SUCCESS = 'SAVE_FILTER_PARAMS_SUCCESS',
}

export interface IFiltrationAction extends IErrorAction {
  filterParams?: ILotsParams[];
}

const saveFilterParamsSuccess: ActionCreator<IFiltrationAction> = (filterParams: ILotsParams[]): IFiltrationAction => {
  return { type: FiltrationTypes.SAVE_FILTER_PARAMS_SUCCESS, filterParams };
};

export const saveLotsFilterParams = (data: ILotsParams, activeTab: TypeTab) => {
  return (dispatch: Dispatch, getState: () => IAysAgroState) => {
    const filterParams = auctionsFilterParamsSelector(getState());
    if (filterParams) {
      const updatedFilterParams = [...filterParams?.slice(0, activeTab), {...data}, ...filterParams?.slice(activeTab + 1)];
      dispatch(saveFilterParamsSuccess(updatedFilterParams));
    }
   
  };
};

