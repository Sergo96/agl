import React from 'react';
import { JustifyContent, FlexDirection, AlignItems } from 'interfaces/flex';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import moment from 'moment';
import { LotEnum, ILotsResult } from 'interfaces/auctions';
import { IProps } from 'interfaces/props';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import LotCardItem from 'atoms/LotCardItem';
import BaseLink from 'atoms/Link';
import Delivery from 'icons/Delivery';
import {getCurrencySymbol} from 'helpers/currency';
import styles from './index.module.scss';

interface Props extends IProps {
  data: ILotsResult;
  lotType: string;
}

const CustomCurrentProductCard: React.FC<Props> = ({ data, lotType }) => {
  const {
    nomenclature,
    company,
    expired_at,
    delivery_method,
    payment_method,
    address,
    prepayment_percent,
    delivery_period,
    price,
  } = data;

  const [t] = useTranslation('common');
  const currency = localStorage.getItem('currency');

  const currencySymbol = getCurrencySymbol(currency)
  const date = expired_at ? moment.unix(Number(expired_at)).format('DD.MM.YYYY') : '';
  return (
    <BaseFlex className={classNames(styles.root, styles[lotType])}>
      <BaseFlex className={styles.header} justifyContent={JustifyContent.SPACE_BETWEEN}>
        <BaseFlex flexDirection={FlexDirection.COLUMN}>
          <BaseTypography value={nomenclature.name} size="sm" weight="medium" className={styles.title} />
          <BaseLink href="#" className={styles.subtitle}>
            {company.name}
          </BaseLink>
        </BaseFlex>
        <BaseFlex className={styles.logo}>
          <BaseFlex alignItems={AlignItems.CENTER} className={styles.logoBox}>
            <img src={company.logo} alt={company.name} />
          </BaseFlex>
        </BaseFlex>
      </BaseFlex>
      {lotType === LotEnum.myCustomCurrentProducts ? (
        <BaseFlex className={styles.price}>
          <BaseFlex>
            {price} <span> {currencySymbol}</span>
          </BaseFlex>
        </BaseFlex>
      ) : null}
      {lotType === LotEnum.currentDemand ? (
        <BaseFlex className={styles.price}>
          <BaseFlex>
            {price}  <span> {currencySymbol}</span>
          </BaseFlex>
        </BaseFlex>
      ) : null}

      {lotType === LotEnum.currentOffers ? (
        <BaseFlex className={styles.price}>
          <BaseFlex>
            {price}  <span> {currencySymbol}</span>
          </BaseFlex>
        </BaseFlex>
      ) : null}

      <BaseFlex className={styles.content}>
        <BaseFlex>
          <LotCardItem title={t<string>('auctions.expiredAt')} value={date} />
          <LotCardItem
            title={t<string>('auctions.payment')}
            value={payment_method ? `${payment_method.name} ${prepayment_percent ? `${prepayment_percent}%` : ''}` : ''}
          />

          <LotCardItem title={t<string>('auctions.deliveryPeriod')} value={delivery_period ? delivery_period : ''} />
        </BaseFlex>
        <BaseFlex className={styles.delivery}>
          <BaseFlex className={styles.deliveryMethodValue} flexDirection={FlexDirection.COLUMN}>
            <BaseFlex className={styles.deliveryTilte}>
              <Delivery className={styles.icon} />
              <BaseTypography
                size="xs"
                color="main"
                value={t<string>('auctions.deliveryMethod')}
                className={classNames(styles.type)}
              />
            </BaseFlex>

            <BaseFlex className={classNames(styles.contentItem)} alignItems={AlignItems.CENTER}>
              <BaseTypography
                value={`${delivery_method.name} ${address ? `(${address})` : ''}   `}
                color={'secondary'}
              />
            </BaseFlex>
          </BaseFlex>
        </BaseFlex>
      </BaseFlex>
      <BaseTypography
        className={styles.value}
        size="xs"
        color="secondary"
        value={`${t('auctions.quantity')} 1 ${t('customCurrentProducts.ton')}`}
      />
    </BaseFlex>
  );
};

export default React.memo(CustomCurrentProductCard);
