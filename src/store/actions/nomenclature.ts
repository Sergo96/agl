import { ActionCreator, Action, Dispatch } from 'redux';
import { dispatchError } from './notifications';
import { IGeneralNomenclatureItem, IGetNomenclature } from 'interfaces/nomenclature';
import { getNomenclatureById, postCustomNomenclature, getAllNomenclature } from 'api/nomenclature';
import IErrorAction from 'interfaces/errors';

export enum NomenclatureTypes {
  LOADING_NOMENCLATURE_BY_ID_REQUEST = 'LOADING_NOMENCLATURE_BY_ID_REQUEST',
  LOADING_NOMENCLATURE_BY_ID_SUCCESS = 'LOADING_NOMENCLATURE_BY_ID_SUCCESS',
  LOADING_NOMENCLATURE_BY_ID_ERROR = 'LOADING_NOMENCLATURE_BY_ID_ERROR',
  LOADING_NOMENCLATURE_REQUEST = 'LOADING_NOMENCLATURE_REQUEST',
  LOADING_NOMENCLATURE_SUCCESS = 'LOADING_NOMENCLATURE_SUCCESS',
  LOADING_NOMENCLATURE_ERROR = 'LOADING_NOMENCLATURE_ERROR',
  CREATE_CUSTOM_NOMENCLATURE_FOR_BUY_REQUEST = 'CREATE_CUSTOM_NOMENCLATURE_FOR_BUY_REQUEST',
  CREATE_CUSTOM_NOMENCLATURE_FOR_BUY_SUCCESS = 'CREATE_CUSTOM_NOMENCLATURE_FOR_BUY_SUCCESS',
  CREATE_CUSTOM_NOMENCLATURE_FOR_BUY_ERROR = 'CREATE_CUSTOM_NOMENCLATURE_FOR_BUY_ERROR',
  CREATE_CUSTOM_NOMENCLATURE_FOR_SELL_REQUEST = 'CREATE_CUSTOM_NOMENCLATURE_FOR_SELL_REQUEST',
  CREATE_CUSTOM_NOMENCLATURE_FOR_SELL_SUCCESS = 'CREATE_CUSTOM_NOMENCLATURE_FOR_SELL_SUCCESS',
  CREATE_CUSTOM_NOMENCLATURE_FOR_SELL_ERROR = 'CREATE_CUSTOM_NOMENCLATURE_FOR_SELL_ERROR',
}
export interface INomenclatureAction extends IErrorAction {
  nomenclature?: IGetNomenclature;
  nomenclatureResults?: IGeneralNomenclatureItem;
}

const loadingNomenclatureByIdRequest: ActionCreator<Action> = () => {
  return { type: NomenclatureTypes.LOADING_NOMENCLATURE_BY_ID_REQUEST };
};

const loadingNomenclatureByIdSuccess: ActionCreator<INomenclatureAction> = (nomenclature: IGetNomenclature) => {
  return { type: NomenclatureTypes.LOADING_NOMENCLATURE_BY_ID_SUCCESS, nomenclature };
};

const loadingNomenclatureByIdError: ActionCreator<Action> = () => {
  return { type: NomenclatureTypes.LOADING_NOMENCLATURE_BY_ID_ERROR };
};

export const loadingNomenclatureById = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingNomenclatureByIdRequest());
    try {
      const nomenclature = await getNomenclatureById(id);
      dispatch(loadingNomenclatureByIdSuccess(nomenclature));
    } catch (e) {
      dispatchError(dispatch, e, loadingNomenclatureByIdError);
    }
  };
};

const loadingNomenclatureRequest: ActionCreator<Action> = () => {
  return { type: NomenclatureTypes.LOADING_NOMENCLATURE_REQUEST };
};

const loadingNomenclatureSuccess: ActionCreator<INomenclatureAction> = (nomenclature: IGetNomenclature) => {
  return { type: NomenclatureTypes.LOADING_NOMENCLATURE_SUCCESS, nomenclature };
};

const loadingNomenclatureError: ActionCreator<Action> = () => {
  return { type: NomenclatureTypes.LOADING_NOMENCLATURE_ERROR };
};

export const loadingNomenclature = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingNomenclatureRequest());
    try {
      const nomenclature = await getAllNomenclature();
      dispatch(loadingNomenclatureSuccess(nomenclature));
    } catch (e) {
      dispatchError(dispatch, e, loadingNomenclatureError);
    }
  };
};
const createCustomNomenclatureForBuyRequest: ActionCreator<Action> = () => {
  return { type: NomenclatureTypes.CREATE_CUSTOM_NOMENCLATURE_FOR_BUY_REQUEST };
};

const createCustomNomenclatureForBuySuccess: ActionCreator<INomenclatureAction> = (
  nomenclatureResults: IGeneralNomenclatureItem
) => {
  return { type: NomenclatureTypes.CREATE_CUSTOM_NOMENCLATURE_FOR_BUY_SUCCESS, nomenclatureResults };
};

const createCustomNomenclatureForBuyError: ActionCreator<Action> = () => {
  return { type: NomenclatureTypes.CREATE_CUSTOM_NOMENCLATURE_FOR_BUY_ERROR };
};

export const createCustomNomenclature = (data: IGeneralNomenclatureItem) => {
  return async (dispatch: Dispatch) => {
    dispatch(createCustomNomenclatureForBuyRequest());
    try {
      const nomenclature = await postCustomNomenclature(data);
      dispatch(createCustomNomenclatureForBuySuccess(nomenclature));
    } catch (e) {
      dispatchError(dispatch, e, createCustomNomenclatureForBuyError);
    }
  };
};
