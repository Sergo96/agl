import BaseTypography from 'atoms/Typography';
import { ITransportCompaniesInfo } from 'interfaces/logistics';
import { IProps } from 'interfaces/props';
import LogisticsCompany from 'molecules/LogisticsCompany';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

interface Props extends IProps {
  transportCompaniesInfo: ITransportCompaniesInfo[];
}
const LogisticsCompanies: React.FC<Props> = ({ transportCompaniesInfo }) => {
  const [t] = useTranslation('common');
  return (
    <div className={styles.root}>
      <BaseTypography
        className={styles.title}
        size="xl"
        weight="semi-bold"
        value={t<string>('logistics.availableCompanies')}
      />
      <div className={styles.companies}>
        {transportCompaniesInfo.map((item, i) => {
          const companyStyle = i % 2 === 0 ? styles.whiteBackground : undefined;
          return <LogisticsCompany className={companyStyle} key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};
export default LogisticsCompanies;
