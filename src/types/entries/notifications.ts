import NotificationTypeEnum from 'interfaces/notifications';

class NotificationEntry {
  message: string;
  type: NotificationTypeEnum;

  constructor(message: string, type: NotificationTypeEnum) {
    this.message = message;
    this.type = type;
  }
}

export default NotificationEntry;

export const makeSuccessNotificationEntry = (message: string) => {
  return new NotificationEntry(message, NotificationTypeEnum.SUCCESS);
};

export const makeErrorNotificationEntry = (message: string) => {
  return new NotificationEntry(message, NotificationTypeEnum.ERROR);
};
