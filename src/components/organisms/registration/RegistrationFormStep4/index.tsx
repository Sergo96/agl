import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { IAysAgroState } from 'store';
import { ArrowsNavigation, TypeTab } from 'interfaces/auth';
import { IProps } from 'interfaces/props';
import { FlexDirection, JustifyContent } from 'interfaces/flex';
import { loadingProducts } from 'actions/products';
import { onChangeTab } from 'actions/auth';
import { productsSelector } from 'selectors/products';
import BaseButton from 'atoms/Button';
import BaseFlex from 'atoms/Flex';
import ProductItem from 'molecules/ProductItem';
import BaseTabs from 'organisms/BaseTabs';
import registrationStyles from '../index.module.scss';
import { IGeneralNomenclatureItem } from 'interfaces/nomenclature';
import styles from './index.module.scss';

const mapStateToProps = (state: IAysAgroState) => {
  return {
    products: productsSelector(state),
    tabType: state.auth.tab,
  };
};

const mapDispatchToProps = {
  loadProducts: () => loadingProducts(),
  onChangeTab: (type: TypeTab) => onChangeTab(type),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends IProps, ArrowsNavigation, PropsFromRedux {}

export interface IDefaultItems {
  id: number;
  item: string;
  chooseItems: number;
  products: IDefaultItemProducts[];
}

export interface IDefaultItemProducts {
  id: number;
  value: string;
  label: string;
  checked: boolean;
}

const RegistrationFormStep4: React.FC<Props> = ({ loadProducts, products, tabType = 1, prev, next, onChangeTab }) => {
  const [t] = useTranslation('common');
  const [activeKey, setActiveKey] = useState('1');

  useEffect(() => {
    loadProducts();
  }, []);

  const onChange = (activeKey: string) => {
    setActiveKey(activeKey);
    onChangeTab((Number(activeKey) - 1) as TypeTab);
  };

  const onSubmit = () => {
    next();
  };

  const Tab1 = () => {
    return (
      <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN}>
        {products &&
          products.map((item: IGeneralNomenclatureItem) => (
            <ProductItem type={tabType} key={item.id} id={item.id} value={item.name} />
          ))}
      </BaseFlex>
    );
  };

  const Tab2 = () => {
    return (
      <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN}>
        {products &&
          products.map((item: IGeneralNomenclatureItem) => (
            <ProductItem type={tabType} key={item.id} id={item.id} value={item.name} />
          ))}
      </BaseFlex>
    );
  };
  const panes = [
    { title: `${t('registration.step4.tab.toBuy')}`, content: <Tab1 />, key: '1' },
    { title: `${t('registration.step4.tab.forSale')}`, content: <Tab2 />, key: '2' },
  ];

  return (
    <div className={styles.root}>
      <BaseTabs className={styles.tabs} data={panes} onChange={onChange} activeKey={activeKey} />
      <BaseFlex
        justifyContent={JustifyContent.SPACE_BETWEEN}
        flexDirection={FlexDirection.ROW}
        className={registrationStyles.stepsAction}
      >
        <BaseButton
          className={registrationStyles.btnBack}
          icon={<LeftOutlined />}
          type="link"
          onClick={prev}
          value={t<string>('registration.navigation.prevStep')}
        />
        <BaseButton
          className={registrationStyles.btnNext}
          onClick={onSubmit}
          icon={<RightOutlined />}
          type="primary"
          value={t<string>('registration.navigation.nextStep')}
        />
      </BaseFlex>
    </div>
  );
};

export default connector(RegistrationFormStep4);
