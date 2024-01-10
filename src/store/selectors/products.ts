import { IAysAgroState } from 'store';
import { createSelector } from 'reselect';
import { IProductsState } from 'reducers/products';

const getState = (state: IAysAgroState): IProductsState => state.products;

export const productsSelector = createSelector([getState], (state) => state.products_for_sell.results);

export const loadingProductsForBuySelector = createSelector([getState], (state) => state.products_for_buy.results);
