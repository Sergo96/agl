import { ConnectedProps, connect } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IAysAgroState } from 'store';
import { IProps } from 'interfaces/props';
import { JustifyContent } from 'interfaces/flex';
import { loadingProducts } from 'actions/products';
import { productsSelector } from 'selectors/products';
import HomePageTitle from 'molecules/HomePageTitle';
import CatalogProductItem from 'molecules/CatalogItem';
import BaseFlex from 'atoms/Flex';
import { nomenclatureSelector } from 'selectors/nomenclature';
import styles from './index.module.scss';
import { IGeneralNomenclatureItem } from 'interfaces/nomenclature';

const mapStateToProps = (state: IAysAgroState) => {
  return {
    products: productsSelector(state),
    nomenclature: nomenclatureSelector(state),
  };
};

const mapDispatchToProps = {
  loadingProducts: () => loadingProducts(),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends IProps, PropsFromRedux {
  language: string;
}

const ProductsCatalog: React.FC<Props> = ({ loadingProducts, products, nomenclature, language }) => {
  const [t] = useTranslation('common');

  useEffect(() => {
    loadingProducts();
  }, [language]);

  return (
    <BaseFlex className={styles.mainWrp} justifyContent={JustifyContent.CENTER}>
      <div id="catalog"></div>
      <BaseFlex className={styles.wrp}>
        <HomePageTitle value={t('homePage.catalogTitle')} className={styles.title} />
        <div className={styles.grid}>
          {products.map((i: IGeneralNomenclatureItem) => (
            <CatalogProductItem key={i.id} title={i.name} category={i.id} nomenclature={nomenclature} />
          ))}
        </div>
      </BaseFlex>
    </BaseFlex>
  );
};

export default connector(ProductsCatalog);
