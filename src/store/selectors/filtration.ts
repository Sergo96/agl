import { IAysAgroState } from 'store';
import { createSelector } from 'reselect';
import { IFiltrationState } from 'reducers/filtration';

const getState = (state: IAysAgroState): IFiltrationState  => state.filtration;

export const auctionsFilterParamsSelector = createSelector([getState], (state) => {
  return state.auctionsFilterParams;
});