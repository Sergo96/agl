import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ConnectedProps, connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IAysAgroState } from 'store';
import { JustifyContent, FlexDirection, AlignItems } from 'interfaces/flex';
import { IProps } from 'interfaces/props';
import { ITopOffersResults } from 'interfaces/topOffers';
import { topOffersSelector } from 'selectors/topOffers';
import { loadingTopOffersData } from 'actions/topOffers';
import HomePageTitle from 'molecules/HomePageTitle';
import SeeAllItem from 'molecules/SeeAllItem';
import OfferItem from 'molecules/OfferItem';
import BaseTypography from 'atoms/Typography';
import BaseButton from 'atoms/Button';
import BaseFlex from 'atoms/Flex';
import styles from './index.module.scss';

const mapStateToProps = (state: IAysAgroState) => {
  return {
    topOffers: topOffersSelector(state),
  };
};

const mapDispatchToProps = {
  loadingTopOffersData: () => loadingTopOffersData(),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends IProps, PropsFromRedux {
  language: string;
}
const TopOffers: React.FC<Props> = ({ loadingTopOffersData, topOffers, language }) => {
  const [t] = useTranslation('common');
  const router = useRouter();

  const [topFifthOffers, setTopFifthOffers] = useState<ITopOffersResults[]>([]);

  useEffect(() => {
    loadingTopOffersData();
  }, [language]);

  useEffect(() => {
    const currentTopFive = topOffers.slice(0, 5);
    setTopFifthOffers(currentTopFive);
  }, [topOffers]);

  const showAllOffers = () => {
    router.push('/home');
  };

  return (
    <BaseFlex className={styles.mainWrp} justifyContent={JustifyContent.CENTER}>
      <BaseFlex className={styles.wrp}>
        <div className={styles.grid}>
          <BaseFlex className={styles.typography}>
            <HomePageTitle className={styles.title} value={t('homePage.topOffers')} />
            <BaseTypography
              className={styles.subtitle}
              value="Lorem a egestas consectetur sed nulla. Lobortis vulputate fusce nisi, ut convallis facilisis amet mi."
            />
            <BaseFlex
              className={styles.btnWrp}
              flexDirection={FlexDirection.COLUMN}
              justifyContent={JustifyContent.END}
            >
              <BaseButton value={t<string>('homePage.addLotForBuy')} className={styles.btnBuy} />
              <BaseButton value={t<string>('homePage.addLotForSell')} className={styles.btnSell} />
            </BaseFlex>
          </BaseFlex>
          <BaseFlex className={styles.offersWrp} alignItems={AlignItems.CENTER}>
            {topFifthOffers.map((item: ITopOffersResults) => (
              <OfferItem
                key={item.id}
                className={styles.offerItem}
                title={item.name}
                subtitle={item.lot_company.name}
                price={item.lot_price}
                deliveryValue={item.lot_delivery_method.name}
              />
            ))}
            <SeeAllItem
              className={styles.offerItem}
              title={t<string>('homePage.seeAllOffers')}
              showAllItems={showAllOffers}
            />
          </BaseFlex>
        </div>
      </BaseFlex>
    </BaseFlex>
  );
};

export default connector(TopOffers);
