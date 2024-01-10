import { ERROR_STATUS_400, ERROR_STATUS_UNAUTHORIZED, UNKNOWN_ERROR_STATUS, ERROR_STATUS_404 } from 'constants/errors';
import AysAgroError from 'entries/errors';
import NotificationEntry, { makeErrorNotificationEntry } from 'entries/notifications';
import IErrorAction from 'interfaces/errors';
import { Action, ActionCreator, Dispatch } from 'redux';

export enum NotificationsActionTypes {
  ADD_NOTIFICATION_SUCCESS = 'ADD_NOTIFICATION_SUCCESS',
  REMOVE_NOTIFICATION_SUCCESS = 'REMOVE_NOTIFICATION_SUCCESS',
}

export interface INotificationAction extends Action {
  message: NotificationEntry;
}

const addNotificationSuccess: ActionCreator<Action> = (message: NotificationEntry) => {
  return { type: NotificationsActionTypes.ADD_NOTIFICATION_SUCCESS, message };
};

const removeNotificationSuccess: ActionCreator<Action> = (message: NotificationEntry) => {
  return { type: NotificationsActionTypes.REMOVE_NOTIFICATION_SUCCESS, message };
};

export const removeNotification = (message: NotificationEntry) => {
  return (dispatch: Dispatch) => {
    dispatch(removeNotificationSuccess(message));
  };
};

export const dispatchNotification = (dispatch: Dispatch, message: NotificationEntry) => {
  return dispatch(addNotificationSuccess(message));
};

export const dispatchError = (
  dispatch: Dispatch,
  error: unknown,
  errorAction: (e: AysAgroError) => IErrorAction,
  notShow?: boolean
) => {
  const e = error as AysAgroError
  switch (e.status) {
    case ERROR_STATUS_400:
      {
        dispatch(errorAction(e));
        if (!notShow && e.message) dispatch(addNotificationSuccess(makeErrorNotificationEntry(e.message)));
      }
      break;
    case ERROR_STATUS_404:
      {
        dispatch(errorAction(e));
        if (!notShow && e.message) dispatch(addNotificationSuccess(makeErrorNotificationEntry(e.message)));
      }
      break;
    case ERROR_STATUS_UNAUTHORIZED:
      {
        // TODO: insert logout action here
        // dispatch(logoutSuccess());
      }
      break;
    case UNKNOWN_ERROR_STATUS:
    default: {
      dispatch(errorAction(e));
      if (e.message) dispatch(addNotificationSuccess(makeErrorNotificationEntry(e.message)));
      else dispatch(addNotificationSuccess(makeErrorNotificationEntry('Network error. Please try again later.')));
    }
  }
};
