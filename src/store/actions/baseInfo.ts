import { getBaseInfo } from 'api/baseInfo';
import { IGetBaseInfo } from 'interfaces/baseInfo';
import IErrorAction from 'interfaces/errors';
import { Action, ActionCreator, Dispatch } from 'redux';
import { dispatchError } from './notifications';

export enum BaseInfoTypes {
  LOADING_BASEINFO_REQUEST = 'LOADING_BASEINFO_REQUEST',
  LOADING_BASEINFO_SUCCESS = 'LOADING_BASEINFO_SUCCESS',
  LOADING_BASEINFO_ERROR = 'LOADING_CURRENCIES_ERROR',
}
export interface ICurrenciesAction extends IErrorAction {
  baseInfo: IGetBaseInfo;
}
const loadingBaseInfoRequest: ActionCreator<Action> = () => {
  return { type: BaseInfoTypes.LOADING_BASEINFO_REQUEST };
};

const loadingBaseInfoSuccess: ActionCreator<ICurrenciesAction> = (baseInfo: IGetBaseInfo) => {
  return { type: BaseInfoTypes.LOADING_BASEINFO_SUCCESS, baseInfo };
};

const loadingBaseInfoError: ActionCreator<Action> = () => {
  return { type: BaseInfoTypes.LOADING_BASEINFO_ERROR };
};

export const loadingBaseInfo = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingBaseInfoRequest());
    try {
      const baseInfo = await getBaseInfo();
      dispatch(loadingBaseInfoSuccess(baseInfo));
    } catch (e) {
      dispatchError(dispatch, e, loadingBaseInfoError);
    }
  };
};
