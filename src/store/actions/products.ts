import { Action, ActionCreator, Dispatch } from 'redux';
import { getProducts } from 'api/products';
import IErrorAction from 'interfaces/errors';
import { IGetProducts } from 'interfaces/product';
import { dispatchError } from './notifications';

export enum ProductsTypes {
  LOADING_PRODUCTS_FOR_SALE_REQUEST = 'LOADING_PRODUCTS_FOR_SALE_REQUEST',
  LOADING_PRODUCTS_FOR_SALE_SUCCESS = 'LOADING_PRODUCTS_FOR_SALE_SUCCESS',
  LOADING_PRODUCTS_FOR_SALE_ERROR = 'LOADING_PRODUCTS_FOR_SALE_ERROR',
  LOADING_PRODUCTS_FOR_BUY_REQUEST = 'LOADING_PRODUCTS_FOR_BUY_REQUEST',
  LOADING_PRODUCTS_FOR_BUY_SUCCESS = 'LOADING_PRODUCTS_FOR_BUY_SUCCESS',
  LOADING_PRODUCTS_FOR_BUY_ERROR = 'LOADING_PRODUCTS_FOR_BUY_ERROR',
}
export interface IProductsAction extends IErrorAction {
  payload?: IGetProducts;
}

const loadingProductsForSaleRequest: ActionCreator<Action> = () => {
  return { type: ProductsTypes.LOADING_PRODUCTS_FOR_SALE_REQUEST };
};

const loadingProductsForSaleSuccess: ActionCreator<IProductsAction> = (payload: IGetProducts) => {
  return { type: ProductsTypes.LOADING_PRODUCTS_FOR_SALE_SUCCESS, payload };
};

const loadingProductsForSaleError: ActionCreator<Action> = () => {
  return { type: ProductsTypes.LOADING_PRODUCTS_FOR_SALE_ERROR };
};

export const loadingProducts = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadingProductsForSaleRequest());
    try {
      const products = await getProducts();
      dispatch(loadingProductsForSaleSuccess(products));
    } catch (e) {
      dispatchError(dispatch, e, loadingProductsForSaleError);
    }
  };
};
