import { connect, ConnectedProps } from 'react-redux';
import { useEffect } from 'react';
import { IAysAgroState } from 'store';
import { IProps } from 'interfaces/props';
import { FlexDirection, JustifyContent, AlignItems } from 'interfaces/flex';
import { loadingHomePageData } from 'actions/homePage';
import { homePageDataSelector } from 'selectors/homePage';
import BaseFlex from 'atoms/Flex';
import Advantages from './Advantages';
import GetPrice from './GetPrice';
import TopOffers from './TopOffers';
import ProductsCatalog from './ProductsCatalog';
import ParticipationConditions from './ParticipationConditions';
import { loadingNomenclature } from 'actions/nomenclature';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

const mapStateToProps = (state: IAysAgroState) => {
  return {
    homePageData: homePageDataSelector(state),
  };
};

const mapDispatchToProps = {
  loadingNomenclature: () => loadingNomenclature(),
  loadingHomePageData: () => loadingHomePageData(),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends IProps, PropsFromRedux {}

const Home: React.FC<Props> = ({ homePageData, loadingHomePageData, loadingNomenclature }) => {
  const { i18n } = useTranslation('common');
  useEffect(() => {
    loadingHomePageData();
    loadingNomenclature();
  }, [i18n.language]);

  return (
    <BaseFlex justifyContent={JustifyContent.CENTER} className={styles.background}>
      <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.wrp} alignItems={AlignItems.CENTER}>
        <GetPrice title={homePageData.title} subtitle={homePageData.text} />
        <Advantages advantages={homePageData.advantages} />
        <ParticipationConditions conditions={homePageData.conditions} requirements={homePageData.requirements} />
        <TopOffers language={i18n.language} />
        <ProductsCatalog language={i18n.language} />
      </BaseFlex>
    </BaseFlex>
  );
};

export default connector(Home);
