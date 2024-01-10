import { ILogisticsState } from 'reducers/logistics';
import { createSelector } from 'reselect';
import { IAysAgroState } from 'store';

const getState = (state: IAysAgroState): ILogisticsState => state.logistics;

export const transportCompaniesInfoSelector = createSelector([getState], (state) => {
  return state.transportCompaniesInfo.results;
});
