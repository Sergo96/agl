import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import classNames from 'classnames';
import { AlignContent, FlexDirection } from 'interfaces/flex';
import { ITransportCompaniesInfo } from 'interfaces/logistics';
import { IProps } from 'interfaces/props';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

interface Props extends IProps {
  item: ITransportCompaniesInfo;
}

const LogisticsCompany: React.FC<Props> = ({ item, className }) => {
  const [t] = useTranslation('common');

  return (
    <BaseFlex className={classNames(styles.root, className)}>
      <BaseFlex className={styles.companyInfoColumn} alignContent={AlignContent.CENTER}>
        <div className={styles.imgBox}>
          <img className={styles.img} src="/assets/images/placeholderLogo.png" alt="logistics company logo" />
        </div>
        <BaseTypography className={styles.titleMobile} size="md" weight="bold" value={item.name} />
      </BaseFlex>
      <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.companyInfoColumn}>
        <BaseTypography className={styles.title} size="md" weight="bold" value={item.name} />
        <div>
          <BaseTypography weight="bold" value={t<string>('logistics.company.address')} />
          <BaseTypography value={` ${item.address}`} />
        </div>
        <div>
          <BaseTypography weight="bold" value={t<string>('logistics.company.phone')} />
          <BaseTypography value={` ${item.phone}`} />
        </div>
        <div>
          <BaseTypography weight="bold" value={t<string>('logistics.company.email')} />
          <BaseTypography value={` ${item.email}`} />
        </div>
        <div>
          <BaseTypography weight="bold" value={t<string>('logistics.company.website')} />
          <BaseTypography value={` ${item.website}`} />
        </div>
      </BaseFlex>
      <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.companyInfoColumn}>
        <div>
          <BaseTypography weight="bold" value={t<string>('logistics.company.price')} />
          <BaseTypography value={` ${item.price}`} />
        </div>
        <div>
          <BaseTypography weight="bold" value={t<string>('logistics.company.description')} />
          <BaseTypography value={` ${item.description}`} />
        </div>
      </BaseFlex>
    </BaseFlex>
  );
};

export default LogisticsCompany;
