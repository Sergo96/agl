import { IProfileState } from 'reducers/profile';
import { createSelector } from 'reselect';
import { IAysAgroState } from 'store';

const getState = (state: IAysAgroState): IProfileState => state.profile;

export const companyProfileInfoSelector = createSelector([getState], (state) => state.companyInfo);

export const userProfileInfoSelector = createSelector([getState], (state) => state.userInfo);

export const documentSelector = createSelector([getState], (state) => state.document);

export const avatarSelector = createSelector([getState], (state) => state.avatar);

export const profileProductsForBuySelector = createSelector([getState], (state) => state.products_for_buy);

export const profileProductsForSellSelector = createSelector([getState], (state) => state.products_for_sell);

export const profileCustomNomenclatureSelector = createSelector([getState], (state) => state.products_add);

export const profileItemsForBuySelector = createSelector([getState], (state) => state.products_for_buy);

export const profileItemsForSellSelector = createSelector([getState], (state) => state.products_for_sell);

export const profileUsername = createSelector([getState], (state) => state.username);
