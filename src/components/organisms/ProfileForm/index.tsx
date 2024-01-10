import React, { useEffect } from 'react';
import BaseTabs from 'organisms/BaseTabs';
import ProfileCompanyInfo from 'organisms/profileTabs/ProfileCompanyInfo';
import ProfileTrusteeInfo from 'organisms/profileTabs/ProfileTrusteeInfo';
import ProfileLoginInfo from 'organisms/profileTabs/ProfileLoginInfo';
import { IProps } from 'interfaces/props';
import { useTranslation } from 'react-i18next';
import ProfileBuyTab from 'organisms/profileTabs/ProfileBuyTab';
import ProfileSellTab from 'organisms/profileTabs/ProfileSellTab';
import { IAysAgroState } from 'store';
import { productsSelector } from 'selectors/products';
import { loadingProducts } from 'actions/products';
import { connect, ConnectedProps } from 'react-redux';
import { loadingNomenclature } from 'actions/nomenclature';
import { nomenclatureSelector } from 'selectors/nomenclature';
import styles from './index.module.scss';

const mapStateToProps = (state: IAysAgroState) => {
  return {
    products: productsSelector(state),
    nomenclature: nomenclatureSelector(state),
  };
};

const mapDispatchToProps = {
  loadProducts: () => loadingProducts(),
  loadNomenclature: () => loadingNomenclature(),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends IProps, PropsFromRedux {}

const ProfileForm: React.FC<Props> = ({ products, nomenclature, loadProducts, loadNomenclature, ...props }) => {
  const [t] = useTranslation('common');
  useEffect(() => {
    loadProducts();
    loadNomenclature();
  }, []);

  const panes = [
    {
      title: t('profile.tabs.company'),
      content: <ProfileCompanyInfo />,
      key: '1',
    },
    {
      title: t('profile.tabs.productstoBuy'),
      content: <ProfileBuyTab products={products} nomenclature={nomenclature} />,
      key: '2',
    },
    {
      title: t('profile.tabs.productsforSale'),
      content: <ProfileSellTab products={products} nomenclature={nomenclature} />,
      key: '3',
    },
    { title: t('profile.tabs.trustee'), content: <ProfileTrusteeInfo />, key: '4' },
    { title: t('profile.tabs.login'), content: <ProfileLoginInfo />, key: '5' },
  ];

  return (
    <div {...props}>
      <BaseTabs className={styles.tabs} data={panes} />
    </div>
  );
};

export default connector(ProfileForm);
