import { CardElementComponent } from '@stripe/react-stripe-js';
import { getCurrentTariff, getTariffs, postPayments } from 'api/subscriptions';
import AysAgroError from 'entries/errors';
import { makeSuccessNotificationEntry } from 'entries/notifications';
import IErrorAction from 'interfaces/errors';
import { IGetTariffsInfo, IPostPaymentMethod, ITariffsInfo } from 'interfaces/subscriptions';
import { Action, ActionCreator, Dispatch } from 'redux';
import { dispatchError, dispatchNotification } from './notifications';

export enum TariffsActionTypes {
  GET_TARIFFS_REQUEST = 'GET_TARIFFS_REQUEST',
  GET_TARIFFS_SUCCESS = 'GET_TARIFFS_SUCCESS',
  GET_CURRENT_TARIFF_REQUEST = 'GET_CURRENT_TARIFF_REQUEST',
  GET_CURRENT_TARIFF_SUCCESS = 'GET_CURRENT_TARIFF_SUCCESS',
  REQUEST_ERROR = 'REQUEST_ERROR',
}

export interface ITariffsAction extends IErrorAction {
  tariffsInfo?: IGetTariffsInfo;
  currentTariffInfo?: ITariffsInfo;
  stripeToken?: CardElementComponent;
}

const requestError: ActionCreator<Action> = (error: AysAgroError) => {
  return { type: TariffsActionTypes.REQUEST_ERROR, error };
};

const loadingTariffsRequest: ActionCreator<Action> = () => {
  return { type: TariffsActionTypes.GET_TARIFFS_REQUEST };
};

const loadingTariffsSuccess: ActionCreator<ITariffsAction> = (tariffsInfo: IGetTariffsInfo) => {
  return { type: TariffsActionTypes.GET_TARIFFS_SUCCESS, tariffsInfo };
};

export const loadingTariffsInfo = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingTariffsRequest());
    try {
      const tariffs = await getTariffs();
      dispatch(loadingTariffsSuccess(tariffs));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};

const loadingCurrentTariffRequest: ActionCreator<Action> = () => {
  return { type: TariffsActionTypes.GET_CURRENT_TARIFF_REQUEST };
};

const loadingCurrentTariffSuccess: ActionCreator<ITariffsAction> = (currentTariffInfo: ITariffsInfo) => {
  return { type: TariffsActionTypes.GET_CURRENT_TARIFF_SUCCESS, currentTariffInfo };
};

export const loadingCurrentTariffInfo = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingCurrentTariffRequest());
    try {
      const tariffs = await getCurrentTariff();
      dispatch(loadingCurrentTariffSuccess(tariffs));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};

export const buySubscription = (data: IPostPaymentMethod, notification: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await postPayments(data);
      dispatchNotification(dispatch, makeSuccessNotificationEntry(notification));
    } catch (e) {
      dispatchError(dispatch, e, requestError);
    }
  };
};
