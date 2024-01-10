import { removeNotification } from 'actions/notifications';
import NotificationEntry from 'entries/notifications';
import { connect, ConnectedProps } from 'react-redux';
import { lastErrorNotificationSelector, lastSuccessNotificationSelector } from 'selectors/notifications';
import { IAysAgroState } from 'store';
import NotificationComponent from 'atoms/Notification';

const mapStateToProps = (state: IAysAgroState) => ({
  success: lastSuccessNotificationSelector(state),
  error: lastErrorNotificationSelector(state),
});

const mapDispatchToProps = {
  removeNotification: (message: NotificationEntry) => removeNotification(message),
};
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Notifications: React.FC<PropsFromRedux> = ({ success, error, removeNotification }) => {
  const onCloseSuccess = () => {
    if (success) removeNotification(success);
  };
  const onCloseError = () => {
    if (error) removeNotification(error);
  };
  return (
    <>
      {success && <NotificationComponent notification={success} onClose={onCloseSuccess} />}
      {error && <NotificationComponent notification={error} onClose={onCloseError} />}
    </>
  );
};

export default connector(Notifications);
