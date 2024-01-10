import React  from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { IProps } from 'interfaces/props';
import { AlignItems, FlexDirection } from 'interfaces/flex';
import { ICompanyData } from 'interfaces/company';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import styles from './index.module.scss';


interface Props extends IProps {
  data: ICompanyData;
}

const CompanyInfoCard: React.FC<Props> = ({ data }) => {
  const [t] = useTranslation('common');
  const { name, logo, trade_type, office_email, office_phone, actual_address, date_create, field_of_activity } = data
 
  const dateCreated = moment(date_create).unix()

  return (
    <BaseFlex>
      <BaseFlex className={styles.header} flexDirection={FlexDirection.ROW}>
        <BaseFlex className={styles.logo}>
          <BaseFlex alignItems={AlignItems.CENTER} className={styles.logoBox}>
            {logo ? <img className={styles.img} src={logo} alt={name} /> : null}
          </BaseFlex>
        </BaseFlex>
        <BaseFlex flexDirection={FlexDirection.COLUMN}>
          <BaseTypography weight="medium" size="xl" value={name} />
          <BaseTypography size="xs" lineHeight="32px" value={office_email} />
          <BaseTypography size="xs" lineHeight="32px" value={office_phone} />
          <BaseTypography size="xs" lineHeight="32px" value={actual_address} />
        </BaseFlex>
      </BaseFlex>

      <div className={styles.grid}>
        <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.column}>
          <BaseTypography weight="medium" size="sm" value={t<string>('company.directionsOfActivity')} />
          <BaseTypography value={trade_type}/>
        </BaseFlex>
        <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.column}>
          <BaseTypography weight="medium" size="sm" value={t<string>('company.typeOfOwnership')} />
         {field_of_activity ? <BaseTypography value={field_of_activity}/> : null} 
        </BaseFlex>
        <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.column} alignItems={AlignItems.FLEX_END}> 
          <BaseTypography weight="medium" size="sm" value={t<string>('company.foundationDate')} />
          <BaseTypography value={dateCreated}/>
        </BaseFlex>
      </div>
    </BaseFlex>
  );
};

export default CompanyInfoCard;
