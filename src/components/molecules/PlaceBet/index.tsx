import React, { ReactText } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { EditFilled } from '@ant-design/icons';
import { FlexDirection, FlexWrap } from 'interfaces/flex';
import { IProps } from 'interfaces/props';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import BaseButton from 'atoms/Button';
import BaseInputNumber from 'atoms/InputNumber';
import styles from './index.module.scss';

interface Props extends IProps {
  value?: number;
  onSubmitBet: (e: React.MouseEvent<HTMLElement>) => void;
  onChangeValue: (e: ReactText) => void;
  redirectToEditPage: () => void;
  recommendedRate: number;
}

const PlaceBet: React.FC<Props> = ({ value, onSubmitBet, onChangeValue, redirectToEditPage, recommendedRate }) => {
  const [t] = useTranslation('common');

  return (
    <BaseFlex flexDirection={FlexDirection.COLUMN}>
      <BaseFlex className={styles.editLink} onClick={redirectToEditPage}>
        <EditFilled className={styles.icon} />
        <BaseTypography
          color="primary"
          weight="medium"
          size="sm"
          className={styles.editConditions}
          value={t<string>('auctions.editConditions')}
        />
      </BaseFlex>
      <BaseTypography color="secondary" value={t<string>('auctions.youHaveTheOpportunityConditions')} />
      <BaseTypography className={styles.inputLabel} color="main" size="sm" weight="regular" value={t<string>('auctions.enterAmount')} />

      <BaseFlex className={styles.formWrp} flexWrap={FlexWrap.NOWRAP}>
        <BaseInputNumber value={value} onChange={onChangeValue} className={styles.input} />
        <BaseFlex flexWrap={FlexWrap.NOWRAP}>
          <BaseButton
            onClick={onSubmitBet}
            className={classNames(styles.btn, styles.add)}
            value={t<string>('auctions.placeBet')}
          />
          <BaseButton className={styles.btn} value={t<string>('auctions.refuse')} />
        </BaseFlex>
      </BaseFlex>
      <BaseTypography
        lineHeight="34px"
        color="secondary"
        value={`${t<string>('auctions.enterAmountFrom')} $ ${recommendedRate}`}
      />
      <BaseTypography lineHeight="24px" color="secondary" value={t<string>('auctions.betsConditions')} />
    </BaseFlex>
  );
};

export default PlaceBet;
