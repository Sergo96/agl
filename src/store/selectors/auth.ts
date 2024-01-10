import { IAysAgroState } from 'store';
import { createSelector } from 'reselect';
import { IAuthState } from 'reducers/auth';

const getState = (state: IAysAgroState): IAuthState => state.auth;

export const isLoginSelector = createSelector([getState], (state) => state.userLogIn);

export const mailHasBeenSentSelector = createSelector([getState], (state) => state.mailHasBeenSent);

export const userRegInfoSelector = createSelector([getState], (state) => state.userRegInfo);

export const loadingProductsForBuySelector = createSelector([getState], (state) => state.userRegInfo.products_for_buy);

export const loadingProductsForSellSelector = createSelector(
  [getState],
  (state) => state.userRegInfo.products_for_sell
);

export const loadingCustomNomencalture = createSelector([getState], (state) => state.userRegInfo.products_add);

export const numberOfSelectedItemsForBuySelector = createSelector(
  [getState],
  (state) => state.userRegInfo.products_for_buy?.length
);

export const numberOfSelectedItemsForSellSelector = createSelector(
  [getState],
  (state) => state.userRegInfo.products_for_sell?.length
);

export const errorMessageSelector = createSelector([getState], (state) => state.errorMessage);
