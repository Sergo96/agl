import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import moment from 'moment';
import { IProps } from 'interfaces/props';
import { FlexDirection, JustifyContent } from 'interfaces/flex';
import { ICreateLot } from 'interfaces/auctions';
import LotCardItem from 'atoms/LotCardItem';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import WarningInfo from 'molecules/WarningInfo';
import BaseButton from 'atoms/Button';
import styles from './index.module.scss';
import stepStyles from '../index.module.scss';


interface Props extends IProps {
  lotState: ICreateLot;
  prev: () => void;
}

const CreateCustomCurrentProductStep2: React.FC<Props> = ({ lotState, prev }) => {
  const [t] = useTranslation('common');
  const {
    price,
    is_purchase,
    delivery_method,
    delivery_to,
    delivery_from,
    address,
    expired_at,
  } = lotState;
  
 const deliveryPeriod = `${t('auctions.from')} ${moment.unix(delivery_from).format('DD.MM.YYYY')} ${t('auctions.to')} ${
  delivery_to && moment.unix(delivery_to).format('DD.MM.YYYY')
}`
  return (
    <BaseFlex flexDirection={FlexDirection.COLUMN}>
    
      <BaseTypography
        weight="bold"
        size="xl"
        as="h2"
        className={styles.header}
        value={t<string>('auctions.create.step3.header')}
      />
      <BaseFlex className={classNames(styles.column, styles.data)}>
        <LotCardItem title={`${t<string>('auctions.lot')} `} value={1} className={classNames(styles.item)} />
        {price ? (
          <LotCardItem
            title={`${t<string>('auctions.startPrice')} `}
            value={price}
            className={classNames(styles.item)}
          />
        ) : (
          null
        )}
        <LotCardItem
          title={`${t<string>('auctions.type')} `}
          value={is_purchase ? t<string>('auctions.typeLotBuy') : t<string>('auctions.typeLotSell')}
          className={classNames(styles.item)}
        />
        {delivery_from ?  (
          <LotCardItem
            title={`${t<string>('auctions.deliveryPeriod')} `}
            value={deliveryPeriod}
            className={classNames(styles.item)}
          />
        ): null}

        {expired_at ? (
          <LotCardItem
            title={`${t<string>('auctions.expiredAt')} `}
            value={moment.unix(Number(expired_at)).format('DD.MM.YYYY HH:mm:ss')}
            className={classNames(styles.item)}
          />
        ) : null}
        {delivery_method ? (
          <LotCardItem
            title={`${t<string>('auctions.deliveryMethod')} `}
            value={`${delivery_method === 1 ? 'FCA' : `DAP (${address})`} ${address}`}
            className={classNames(styles.item)}
          />
        ) : null}
      </BaseFlex>
      <BaseFlex>
        <WarningInfo className={styles.info} value={t<string>('auctions.create.step3.warningAuction')} />
      </BaseFlex>
      <BaseFlex
        justifyContent={JustifyContent.SPACE_BETWEEN}
        flexDirection={FlexDirection.ROW}
        className={stepStyles.stepsAction}
      >
        <BaseButton
          type="link"
          className={stepStyles.btnPrev}
          value={t<string>('registration.navigation.prevStep')}
          onClick={prev}
        />
         <BaseButton
          className={stepStyles.btnNext}
          type="primary"
          value={t<string>('registration.navigation.nextStep')}
        />
      </BaseFlex>
    </BaseFlex>
  );
};

export default CreateCustomCurrentProductStep2;
