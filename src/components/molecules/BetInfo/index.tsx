import React from 'react';
import { useTranslation } from 'react-i18next';
import { JustifyContent, FlexDirection } from 'interfaces/flex';
import { ILotsResult } from 'interfaces/auctions';
import { IProps } from 'interfaces/props';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import styles from './index.module.scss';

interface Props extends IProps {
  data: ILotsResult;
  currency?: string | null
}

const BetInfo: React.FC<Props> = ({ data, currency }) => {
  const [t] = useTranslation('common');

  return (
    <BaseFlex flexDirection={FlexDirection.COLUMN}>
      <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN}>
        <BaseFlex flexDirection={FlexDirection.COLUMN}>
          <BaseTypography weight="medium" size="sm" value={t<string>('auctions.leadingRate')} />
          {data?.current_offer && (
            <BaseTypography
              weight="bold"
              color="primary"
              className={styles.mainPrice}
              value={`$ ${data?.current_offer?.price}`}
              title={`${currency} ${data?.current_offer?.selected_currency_price}`}
            />
          )}
        </BaseFlex>
      </BaseFlex>

      <BaseTypography color="secondary" className={styles.selectedCompany} value={data.current_offer?.company.name} />
    </BaseFlex>
  );
};

export default BetInfo;
