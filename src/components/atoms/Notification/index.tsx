import antDNotification from 'antd/lib/notification';
import NotificationEntry from 'entries/notifications';
import { IProps } from 'interfaces/props';
import { useEffect } from 'react';

interface Props extends IProps {
  notification: NotificationEntry;
  onClose: () => void;
}

const key = 'updatable';

const Notification: React.FC<Props> = ({ notification }) => {
  useEffect(() => {
    antDNotification[notification.type]({
      key,
      message: notification.message,
    });
  }, []);
  return <></>;
};

export default Notification;
