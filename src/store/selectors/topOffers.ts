import { IAysAgroState } from 'store';
import { createSelector } from 'reselect';
import { ITopOffersState } from 'reducers/topOffers';

const getState = (state: IAysAgroState): ITopOffersState => state.topOffers;

export const topOffersSelector = createSelector([getState], (state) => {
  return state.data.results;
});