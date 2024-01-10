import { INotificationAction, NotificationsActionTypes } from 'actions/notifications';
import NotificationEntry from 'entries/notifications';
import NotificationTypeEnum from 'interfaces/notifications';

export interface INotificationsState {
  success?: NotificationEntry;
  info?: NotificationEntry;
  warning?: NotificationEntry;
  error?: NotificationEntry;
}

export const initState: INotificationsState = {};

function notificationReducer(state = initState, action: INotificationAction): INotificationsState {
  switch (action.type) {
    case NotificationsActionTypes.ADD_NOTIFICATION_SUCCESS: {
      const { message } = action;
      switch (message.type) {
        case NotificationTypeEnum.SUCCESS:
          return { ...state, success: message };
        case NotificationTypeEnum.INFO:
          return { ...state, info: message };
        case NotificationTypeEnum.WARNING:
          return { ...state, warning: message };
        case NotificationTypeEnum.ERROR:
          return { ...state, error: message };
      }
      break;
    }
    case NotificationsActionTypes.REMOVE_NOTIFICATION_SUCCESS: {
      const { message } = action;
      switch (message.type) {
        case NotificationTypeEnum.SUCCESS:
          return { ...state, success: undefined };
        case NotificationTypeEnum.INFO:
          return { ...state, info: undefined };
        case NotificationTypeEnum.WARNING:
          return { ...state, warning: undefined };
        case NotificationTypeEnum.ERROR:
          return { ...state, error: undefined };
      }
    }
  }
  return state;
}

export default notificationReducer;
