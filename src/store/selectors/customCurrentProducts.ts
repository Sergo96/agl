import { IAysAgroState } from 'store';
import { createSelector } from 'reselect';
import { ICustomCurrentProductsState } from 'reducers/customCurrentProducts';

const getState = (state: IAysAgroState): ICustomCurrentProductsState => state.customCurrentProducts;

export const customCurrentProductsForBuySelector = createSelector([getState], (state) => {
  return state.customCurrenProductForBuy.results;
});

export const customCurrentProductsForSellSelector = createSelector([getState], (state) => {
  return state.customCurrenProductForSell.results;
});

export const myCustomCurrentProductsSelector = createSelector([getState], (state) => {
  return state.myCustomCurrentProducts.results;
});
