import BaseButton from 'atoms/Button';
import BaseTypography from 'atoms/Typography';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

const RegistrationSuccess: React.FC = () => {
  const [t] = useTranslation('common');
  const router = useRouter();

  return (
    <div className={styles.root}>
      <BaseTypography className={styles.title} value={t<string>('registration.success.title')} />
      <BaseTypography className={styles.infoText} value={t<string>('registration.success.text1')} />
      <BaseTypography className={styles.infoText} value={t<string>('registration.success.text2')} />
      <BaseButton onClick={() => router.push('/home')} type="primary" value="Понятно" className={styles.btnWide} />
    </div>
  );
};

export default RegistrationSuccess;
