import { ActionCreator, Action, Dispatch } from 'redux';
import { dispatchError } from './notifications';
import IErrorAction from 'interfaces/errors';
import { ITopOffers } from 'interfaces/topOffers';
import { getTopOffers } from 'api/offers';

export enum TopOffersTypes {
  LOADING_TOP_OFFERS_REQUEST = 'LOADING_TOP_OFFERS_REQUEST',
  LOADING_TOP_OFFERS_SUCCESS = 'LOADING_TOP_OFFERS_SUCCESS',
  LOADING_TOP_OFFERS_ERROR = 'LOADING_TOP_OFFERS_ERROR',
}

export interface ITopOffersAction extends IErrorAction {
  payload: ITopOffers;
}

const loadingTopOffersRequest: ActionCreator<Action> = () => {
  return { type: TopOffersTypes.LOADING_TOP_OFFERS_REQUEST };
};

const loadingTopOffersSuccess: ActionCreator<ITopOffersAction> = (payload: ITopOffers) => {
  return { type: TopOffersTypes.LOADING_TOP_OFFERS_SUCCESS, payload };
};

const loadingTopOffersError: ActionCreator<Action> = () => {
  return { type: TopOffersTypes.LOADING_TOP_OFFERS_ERROR };
};

export const loadingTopOffersData = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingTopOffersRequest());
    try {
      const data = await getTopOffers();
      dispatch(loadingTopOffersSuccess(data));
    } catch (e) {
      dispatchError(dispatch, e, loadingTopOffersError);
    }
  };
};
