import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseLink from 'atoms/Link';
import BaseTypography from 'atoms/Typography';
import Mailbox from 'icons/Mailbox';
import styles from './index.module.scss';

const RegistrationPending: React.FC = () => {
  const [t] = useTranslation('common');

  return (
    <div className={styles.root}>
      <Mailbox />
      <div className={styles.info}>
        <div className={styles.infoText}>
          <BaseTypography value={t<string>('registration.pending.text1')} />
          <BaseLink href="mailto:info@site.com"> info@site.com </BaseLink>
        </div>
        <BaseTypography className={styles.infoText} value={t<string>('registration.pending.text2')} />
        <div className={styles.infoTextSmall}>
          <BaseTypography value={t<string>('registration.pending.text3')} />
          <BaseLink href="mailto:info@site.com"> {t('registration.pending.text4')} </BaseLink>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPending;
