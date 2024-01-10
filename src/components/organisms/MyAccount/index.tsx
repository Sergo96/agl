import { IProps } from 'interfaces/props';
import BaseTabs from 'organisms/BaseTabs';
import Profile from 'organisms/Profile';
import Subscriptions from 'organisms/subscriptions/Subscriptions';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

interface Props extends IProps {}

const MyAccount: React.FC<Props> = () => {
  const [t] = useTranslation('common');

  const panes = [
    {
      title: t('profile.tabs.company'),
      content: <Profile />,
      key: '1',
    },
    {
      title: t('profile.tabs.productstoBuy'),
      content: <Subscriptions />,
      key: '2',
    },
  ];
  return (
    <div className={styles.root}>
      <BaseTabs className={styles.tabs} data={panes} />
    </div>
  );
};

export default MyAccount;
