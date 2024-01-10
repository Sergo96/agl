import { ISubscriptionsState } from 'reducers/subscriptions';
import { createSelector } from 'reselect';
import { IAysAgroState } from 'store';

const getState = (state: IAysAgroState): ISubscriptionsState => state.subscriptions;

export const tariffsInfoSelector = createSelector([getState], (state) => state.tariffsInfo.results);
export const currentTariffInfoSelector = createSelector([getState], (state) => state.currentTariffInfo);
