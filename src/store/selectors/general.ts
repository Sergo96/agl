import { IAysAgroState } from 'store';
import { createSelector } from 'reselect';
import { IGeneralState } from 'reducers/general';

const getState = (state: IAysAgroState): IGeneralState => state.general;

export const countryListSelector = createSelector([getState], (state) => state.countryList);

export const ownershipListSelector = createSelector([getState], (state) => state.ownershipList);

export const statusListSelector = createSelector([getState], (state) => state.statusList);
