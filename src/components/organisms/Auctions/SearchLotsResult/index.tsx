import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IAysAgroState } from 'store';
import { searchLotsSelector } from 'selectors/auctions';
import { JustifyContent, FlexDirection } from 'interfaces/flex';
import { ILotsResult } from 'interfaces/auctions';
import { IProps } from 'interfaces/props';
import { searchLots } from 'actions/auctions';
import EmptyAuctionsData from 'molecules/EmptyAuctionsData';
import SearchAuctionLot from 'molecules/SearchAuctionLot';
import LotCard from 'molecules/LotCard';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import styles from './index.module.scss';

const mapDispatchToProps = {
  searchLots: (value: string) => searchLots(value),
};

const mapStateToProps = (state: IAysAgroState) => {
  return {
    foundLots: searchLotsSelector(state),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends IProps, PropsFromRedux {}

const SearchLotsResult: React.FC<Props> = ({ foundLots, searchLots }) => {
  const [t] = useTranslation('common');
  const router = useRouter();
  const params = router.query.q as string;

  useEffect(() => {
    params && searchLots(params);
  }, [params]);

  return (
    <BaseFlex justifyContent={JustifyContent.START} className={styles.root}>
      <BaseFlex className={styles.header} flexDirection={FlexDirection.COLUMN}>
        <BaseFlex justifyContent={JustifyContent.END}>
          <SearchAuctionLot placeholder={t('auctions.searchLots')} className={styles.search} />
        </BaseFlex>
        <BaseTypography as="h1" size="xl" value={params} className={styles.mainTitle} />
      </BaseFlex>
      {foundLots ? (
        <>
          {foundLots.user_lots.length > 0 && (
            <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.typeWrp}>
              <BaseTypography as="h2" value={`${t<string>('auctions.title.myAuctions')}: `} className={styles.title} />
              <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN}>
                {foundLots?.user_lots.map((item: ILotsResult) => (
                  <LotCard lotType={'my-auctions'} key={item.id} data={item} />
                ))}
              </BaseFlex>
            </BaseFlex>
          )}
          {foundLots?.in_progress.length > 0 && (
            <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.typeWrp}>
              <BaseTypography as="h2" value={`${t('auctions.title.auctionsInProgress')}: `} className={styles.title} />
              <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN}>
                {foundLots?.in_progress.map((item: ILotsResult) => (
                  <LotCard key={item.id} lotType={'auctions-in-progress'} data={item} />
                ))}
              </BaseFlex>
            </BaseFlex>
          )}

          {foundLots?.user_commercial_offers.length > 0 && (
            <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.typeWrp}>
              <BaseTypography as="h2" value={`${t('auctions.title.myCO')}: `} className={styles.title} />
              <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN}>
                {foundLots?.user_commercial_offers.map((item: ILotsResult) => (
                  <LotCard key={item.id} lotType={'my-commercial-offers'} data={item} />
                ))}
              </BaseFlex>
            </BaseFlex>
          )}
          {foundLots?.user_commercial_offer_answers.length > 0 && (
            <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.typeWrp}>
              <BaseTypography as="h2" value={`${t('auctions.title.responseCO')}: `} className={styles.title} />
              <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN}>
                {foundLots?.user_commercial_offer_answers.map((item: ILotsResult) => (
                  <LotCard key={item.id} lotType={'my-commercial-offers-response'} data={item} />
                ))}
              </BaseFlex>
            </BaseFlex>
          )}

          {foundLots?.invites.length > 0 && (
            <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.typeWrp}>
              <BaseTypography as="h2" value={`${t('auctions.title.offers')}: `} className={styles.title} />
              <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN}>
                {foundLots?.invites.map((item: ILotsResult) => (
                  <LotCard key={item.id} lotType={'invites'} data={item} />
                ))}
              </BaseFlex>
            </BaseFlex>
          )}
        </>
      ) : (
        <EmptyAuctionsData isBtn={false} value={t('auctions.dataEmpty')} />
      )}
    </BaseFlex>
  );
};

export default connector(SearchLotsResult);
