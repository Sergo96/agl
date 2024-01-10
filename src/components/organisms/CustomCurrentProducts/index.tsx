import { connect, ConnectedProps } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import { IAysAgroState } from 'store';
import { useTranslation } from 'react-i18next';
import { JustifyContent, FlexDirection, AlignItems } from 'interfaces/flex';
import { ILotsParams } from 'interfaces/auctions';
import { IProps } from 'interfaces/props';
import { TypeTab } from 'interfaces/auth';
import { IOption } from 'interfaces/options';
import { customCurrentProductsForBuySelector, customCurrentProductsForSellSelector,  myCustomCurrentProductsSelector } from 'selectors/customCurrentProducts';
import { auctionsFilterParamsSelector } from 'selectors/filtration';
import { productsSelector } from 'selectors/products';
import { userRegInfoSelector } from 'selectors/auth';
import { loadingCustomCurrentProductsForBuy, loadingCustomCurrentProductsForSell, loadingMyCustomCurrentProducts } from 'actions/customCurrentProducts';
import { saveLotsFilterParams } from 'actions/filtration';
import { onChangeTab } from 'actions/auth';
import { loadingProducts } from 'actions/products';
import BaseTabs from 'organisms/BaseTabs';
import LotsFilterPanel from 'molecules/LotsFilterPanel';
import BaseFlex from 'atoms/Flex';
import CustomCurrentProductList from './CustomCurrentProductList';
import styles from './index.module.scss';
import BaseTypography from 'atoms/Typography';
import BaseButton from 'atoms/Button';
import { useRouter } from 'next/router';

const mapDispatchToProps = {
  loadingCustomCurrentProductsForBuy: (data: ILotsParams) => loadingCustomCurrentProductsForBuy(data),
  loadingCustomCurrentProductsForSell: (data: ILotsParams) => loadingCustomCurrentProductsForSell(data),
  loadingMyCustomCurrentProducts: (data: ILotsParams) => loadingMyCustomCurrentProducts(data),
  saveLotsFilterParams: (data: ILotsParams, type: TypeTab) => saveLotsFilterParams(data, type),
  loadingProducts: () => loadingProducts(),
  onChangeItemsTab: (type: TypeTab) => onChangeTab(type),
};

const mapStateToProps = (state: IAysAgroState) => {
  return {
    customCurrenProductForBuy: customCurrentProductsForBuySelector(state),
    customCurrenProductForSell: customCurrentProductsForSellSelector(state),
    myCustomCurrentProducts: myCustomCurrentProductsSelector(state),
    globalFilterParams: auctionsFilterParamsSelector(state),
    products: productsSelector(state),
    userData: userRegInfoSelector(state),
    currentTab: state.customCurrentProducts.tab,
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends IProps, PropsFromRedux {}

const CustomCurrentProducts: React.FC<Props> = ({
  customCurrenProductForBuy,
  customCurrenProductForSell,
  loadingCustomCurrentProductsForBuy,
  loadingCustomCurrentProductsForSell,
  loadingMyCustomCurrentProducts,
  myCustomCurrentProducts,
  onChangeItemsTab,
  saveLotsFilterParams,
  globalFilterParams,
  products,
  userData,
  loadingProducts,
  currentTab,
}) => {
  const [t, i18n] = useTranslation('common');
  const router = useRouter()

  const panes = [
    {
      title: `${t('customCurrentProducts.title.currentDemand')} (${customCurrenProductForBuy.length})`,
      content: <CustomCurrentProductList data={customCurrenProductForBuy} lotType="customCurrenProductForBuy" />,
      key: '1',
    },
    {
      title: `${t('customCurrentProducts.title.currentOffers')} (${customCurrenProductForSell.length})`,
      content: <CustomCurrentProductList data={customCurrenProductForSell} lotType="customCurrenProductForSell" />,
      key: '2',
    },
    {
      title: `${t('customCurrentProducts.title.myCurrentOffers')} (${myCustomCurrentProducts.length})`,
      content: <CustomCurrentProductList data={myCustomCurrentProducts} lotType="myCustomCurrentProducts" />,
      key: '3',
    },
  ];
  const ALL_ITEMS = `${t('auctions.all')}`;

  const productsOptions: IOption[] = useMemo(() => {
    const result: IOption[] = [];
    result.push({ value: ALL_ITEMS, label: ALL_ITEMS });
    products.map((i) => {
      result.push({ value: i.id, label: i.name });
    });
    return result;
  }, [products, i18n.language]);

  const [activeTabKey, setActiveTabKey] = useState<string>('1');
  const [filterParams, setFilterParams] = useState<ILotsParams>({
    company: '',
    category: '',
    nomenclature: '',
    delivery_method: '',
    payment_method: '',
    is_purchase: null,
    quantity: { minValue: '', maxValue: '' },
    price: { minValue: '', maxValue: '' },
    typeSorting: '',
  });

  useEffect(() => {
    loadingProducts();
    loadingCustomCurrentProductsForBuy(filterParams);
    loadingCustomCurrentProductsForSell(filterParams);
    loadingMyCustomCurrentProducts(filterParams);
  }, [i18n.language]);


  const onChangeProduct = (value: string | number) => {
    
    const category = value === ALL_ITEMS ? '' : value.toString();
    const params = { ...filterParams, category };
    setFilterParams(params);
    if (activeTabKey === '1') {
      loadingCustomCurrentProductsForBuy(params);
    } else if (activeTabKey === '2') {
      loadingCustomCurrentProductsForSell(params);
    } else if (activeTabKey === '3') {
      loadingMyCustomCurrentProducts(params);
    }
    saveLotsFilterParams(params, currentTab - 1 as TypeTab);
  };

  const onChangeTypeSortingPrice = (value: string | number) => {
    const params = { ...filterParams, ordering: value };
    setFilterParams(params);
    if (activeTabKey === '1') {
      loadingCustomCurrentProductsForBuy(params);
    } else if (activeTabKey === '2') {
      loadingCustomCurrentProductsForSell(params);
    } else if (activeTabKey === '3') {
      loadingMyCustomCurrentProducts(params);
    }
    saveLotsFilterParams(params, currentTab - 1 as TypeTab);
  };

  const onChangeCurrenTab = (activeKey: string) => {
    const type = Number(activeKey) as TypeTab;
    type && onChangeItemsTab(type);
    setActiveTabKey(activeKey);
  };

  const onSaveLotsFilterParams = (filterModalParams: ILotsParams) => {
    const params = {...filterModalParams, is_purchase: null}
    if (activeTabKey === '1') {
      loadingCustomCurrentProductsForBuy(params);
    } else if (activeTabKey === '2') {
      loadingCustomCurrentProductsForSell(params);
    } else if (activeTabKey === '3') {
      loadingMyCustomCurrentProducts(params);
    }
    saveLotsFilterParams(params, currentTab - 1 as TypeTab);
  };

  const redirectToCreateProduct = () => {
    router.push('/create-product')
  }
  return (
    <BaseFlex justifyContent={JustifyContent.START} className={styles.root}>
      <BaseFlex flexDirection={FlexDirection.ROW} alignItems={AlignItems.CENTER} justifyContent={JustifyContent.SPACE_BETWEEN} className={styles.header}>
        <BaseTypography as="h2" value={t<string>('customCurrentProducts.header')} size="xxl" weight="semi-bold" />
        <BaseButton value={t<string>('customCurrentProducts.btnAddOffer')} className={styles.btn} onClick={redirectToCreateProduct}/>
      </BaseFlex>
      <BaseTabs data={panes} className={styles.tab} activeKey={activeTabKey} onChange={onChangeCurrenTab}>
        <LotsFilterPanel
          filterProductParams={globalFilterParams && globalFilterParams[Number(activeTabKey) - 1].category}
          filterIsPurchase={globalFilterParams && globalFilterParams[Number(activeTabKey) - 1].is_purchase}
          productsOptions={productsOptions}
          onChangeProduct={onChangeProduct}
          onChangeTypeSortingPrice={onChangeTypeSortingPrice}
          userData={userData}
          products={products}
          typeProduct={'current_items'}
          saveLotsFilterParams={onSaveLotsFilterParams}
        />
      </BaseTabs>
    </BaseFlex>
  );
};

export default connector(CustomCurrentProducts);