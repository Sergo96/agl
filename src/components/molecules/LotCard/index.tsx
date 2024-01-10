import { JustifyContent, FlexDirection, AlignItems } from 'interfaces/flex';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import moment from 'moment';
import { useRouter } from 'next/router';
import { LotEnum, ILotsResult } from 'interfaces/auctions';
import { IProps } from 'interfaces/props';
import BaseFlex from 'atoms/Flex';
import BaseButton from 'atoms/Button';
import BaseTypography from 'atoms/Typography';
import LotCardItem from 'atoms/LotCardItem';
import BaseLink from 'atoms/Link';
import styles from './index.module.scss';

interface Props extends IProps {
  data: ILotsResult;
  lotType: string;
  rejectAuctionInvite?: (id: number) => void;
}

const LotCard: React.FC<Props> = ({ data, lotType, rejectAuctionInvite }) => {
  const {
    nomenclature,
    company,
    type,
    is_purchase,
    expired_at,
    current_offer,
    delivery_method,
    payment_method,
    address,
    prepayment_percent,
    delivery_period,
    id,
    quantity,
    units,
  } = data;

  const [t] = useTranslation('common');
  const router = useRouter();
  const currency = localStorage.getItem('currency');

  const redirectToItem = () => {
    router.push({
      pathname: `/auctions/${lotType}/${id}`,
      query: { lotType: lotType, typeOperation: type },
    });
  };

  const rejectInvite = () => {
    rejectAuctionInvite && rejectAuctionInvite(id);
  };

  let color;
  if (type === 'commercial_offer' && lotType === 'invites') {
    color = styles.invitesCommercialOffer;
  } else if (type === 'auction' && lotType === 'invites') {
    color = styles.invitesAuctions;
  }

  const date = expired_at ? moment.unix(Number(expired_at)).format('DD.MM.YYYY') : '';
  return (
    <BaseFlex className={classNames(styles.root, styles[lotType], color)}>
      <BaseFlex className={styles.header} justifyContent={JustifyContent.SPACE_BETWEEN}>
        <BaseFlex flexDirection={FlexDirection.COLUMN}>
          <BaseTypography value={nomenclature.name} className={styles.title} />
          <BaseLink href="#" className={styles.subtitle}>
            {company.name}
          </BaseLink>
        </BaseFlex>
        {type === 'auction' && lotType === 'invites' ? (
          <BaseButton value={t<string>('auctions.btnReject')} onClick={rejectInvite} className={styles.btnReject} />
        ) : null}
        {type === 'commercial_offer' && (
          <BaseTypography
            value={t<string>('auctions.CO')}
            className={classNames(styles.btnCO, styles[lotType], color)}
            size="md"
            weight="medium"
          />
        )}
      </BaseFlex>
      <BaseFlex className={styles.content}>
        <BaseFlex>
          {lotType === LotEnum.myAuctions || lotType === LotEnum.auctionsInProgress || lotType === LotEnum.invites ? (
            <LotCardItem title={t<string>('auctions.lot')} value={id ? id : ''} />
          ) : null}
          <LotCardItem
            title={t<string>('auctions.type')}
            value={is_purchase ? t<string>('auctions.typeLotBuy') : t<string>('auctions.typeLotSell')}
          />
          <LotCardItem title={t<string>('auctions.expiredAt')} value={date} />
          <LotCardItem
            title={t<string>('auctions.quantity')}
            value={quantity ? `${quantity} ${units ? units.name : ''}` : ''}
          />
          {lotType === LotEnum.myCommercialOffers || lotType === LotEnum.myCommercialOffersResponse ? (
            <LotCardItem
              title={t<string>('auctions.payment')}
              value={payment_method ? `${payment_method.name} ${prepayment_percent ? prepayment_percent : ''}` : ''}
            />
          ) : null}
          {lotType === LotEnum.myCommercialOffersResponse ? (
            <LotCardItem title={t<string>('auctions.deliveryPeriod')} value={delivery_period ? delivery_period : ''} />
          ) : null}
        </BaseFlex>
        <BaseFlex alignItems={AlignItems.FLEX_START}>
          {type === 'commercial_offer' && lotType === LotEnum.invites || lotType === LotEnum.myCommercialOffers ? null : <LotCardItem
            title={t<string>('auctions.currentOffer')}
            value={current_offer?.price ? `${current_offer?.price} ${currency}` : `0.00 ${currency}`}
            classNameTitle={styles.typeOffer}
            classNameValue={classNames(styles.priceValue, styles[lotType])}
          /> }
          <LotCardItem
            title={t<string>('auctions.deliveryMethod')}
            value={`${delivery_method.name} ${address ? `(${address})` : ''}   `}
            className={styles.deliveryMethodValue}
          />
        </BaseFlex>
      </BaseFlex>
      {lotType !== 'my-commercial-offers-response' && (
        <BaseFlex className={styles.footer} justifyContent={JustifyContent.END}>
          <BaseButton value={t<string>('auctions.details')} onClick={redirectToItem} className={styles.btn} />
        </BaseFlex>
      )}
    </BaseFlex>
  );
};

export default LotCard;
