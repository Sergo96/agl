import { INotificationsState } from 'reducers/notifications';
import { createSelector } from 'reselect';
import { IAysAgroState } from 'store';

const getState = (state: IAysAgroState): INotificationsState => state.notifications;

export const lastSuccessNotificationSelector = createSelector([getState], (state) => {
  return state.success;
});

export const lastInfoNotificationSelector = createSelector([getState], (state) => {
  return state.info;
});

export const lastWarningNotificationSelector = createSelector([getState], (state) => {
  return state.warning;
});

export const lastErrorNotificationSelector = createSelector([getState], (state) => {
  return state.error;
});
