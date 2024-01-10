import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import BaseButton from 'atoms/Button';
import BaseTypography from 'atoms/Typography';
import BaseFlex from 'atoms/Flex';
import { JustifyContent, AlignItems } from 'interfaces/flex';
import { IProps } from 'interfaces/props';
import BaseLink from 'atoms/Link';
import CompanyLogo from 'atoms/CompanyLogo';
import styles from './index.module.scss';

interface Props extends IProps {}

const UnauthorizedHeader: React.FC<Props> = () => {
  const router = useRouter();
  const [t] = useTranslation('common');

  return (
    <BaseFlex justifyContent={JustifyContent.CENTER}>
      <div className={styles.root}>
        <BaseLink href={'/home'}>
          <CompanyLogo />
        </BaseLink>

        <BaseFlex justifyContent={JustifyContent.END} alignItems={AlignItems.CENTER}>
          <BaseTypography
            value={
              router.pathname === '/registration'
                ? t<string>('header.alreadyRegistered')
                : t<string>('header.noAccount')
            }
            className={styles.link}
          />
          <BaseLink href={router.pathname === '/registration' ? '/login' : '/registration'}>
            <BaseButton
              type="primary"
              value={router.pathname === '/registration' ? t<string>('header.login') : t<string>('header.registration')}
              className={styles.button}
            />
          </BaseLink>
        </BaseFlex>
      </div>
    </BaseFlex>
  );
};

export default UnauthorizedHeader;
