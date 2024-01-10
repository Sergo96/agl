import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { JustifyContent, FlexWrap } from 'interfaces/flex';
import { IRegistrationData } from 'interfaces/auth';
import { IGeneralNomenclatureItem } from 'interfaces/nomenclature';
import { ILotsParams } from 'interfaces/auctions';
import { IProps } from 'interfaces/props';
import { IOption } from 'interfaces/options';
import BaseSelect from 'atoms/Select';
import BaseFlex from 'atoms/Flex';
import BaseButton from 'atoms/Button';
import FilterIcon from 'icons/FilterIcon';
import SearchAuctionLot from 'molecules/SearchAuctionLot';
import FilterLotsModal from 'molecules/FilterLotsModal';
import styles from './index.module.scss';


interface Props extends IProps{
  productsOptions: IOption[];
  onChangeProduct: (value: string | number) => void;
  onChangeTradeType?: (value: string | number) => void;
  onChangeTypeSortingPrice?: (value: string | number) => void;
  filterProductParams: string | null;
  filterIsPurchase: boolean | null;
  userData: IRegistrationData;
  products: IGeneralNomenclatureItem[];
  typeProduct?: string;
  saveLotsFilterParams: (filterParams: ILotsParams) => void;
}

const LotsFilterPanel: React.FC<Props> = ({
  userData,
  productsOptions,
  onChangeProduct,
  onChangeTradeType,
  onChangeTypeSortingPrice,
  filterProductParams,
  filterIsPurchase,
  products,
  typeProduct,
  saveLotsFilterParams,
}) => {
  const [t] = useTranslation('common');
  const { i18n } = useTranslation('common');
  const [isFilterModal, setIsFilterModal] = useState(false);
  const ALL_ITEMS = `${t('auctions.all')}`;
  const companyTradeType = userData?.company?.trade_type;

  const typeSortingOptions: IOption[] = [
    { value: '-created_at', label: t('auctions.filter.fromOldToNew') },
    { value: 'created_at', label: t('auctions.filter.fromNewToOld') },
  ];

  const typeSortingPriceOptions: IOption[] = [
    { value: 'null', label: ALL_ITEMS },
    { value: 'price', label: t('auctions.filter.lowestPrice') },
    { value: '-price', label: t('auctions.filter.highestPrice') },
    { value: 'popularity', label: t('auctions.filter.popular') },
    { value: 'created_at', label: t('auctions.filter.new') },
  ];

  const tradeTypeParams: IOption[] = [
    { value: 'null', label: ALL_ITEMS },
    { value: 'true', label: `${t('auctions.buy')}` },
    { value: 'false', label: `${t('auctions.sell')}` },
  ];

  const [selectedProductValue, setSelectedProductValue] = useState<string>(productsOptions[0].label);
  const [selectedTradeTypeParams, setSelectedTradeTypeParams] = useState<string>(tradeTypeParams[0].label);

  const [selectedTypeSortingPrice, setSelectedTypeSortingPrice] = useState<string>(typeSortingPriceOptions[0].label);

  useEffect(() => {
    const product = products ? products.find((i) => i.id.toString() === filterProductParams) : null;
    if (product) {
      setSelectedProductValue(product.name);
    } else {
      setSelectedProductValue(productsOptions[0].label);
    }
  }, [filterProductParams]);

  useEffect(() => {
    if (filterIsPurchase === true) {
      setSelectedTradeTypeParams(t('auctions.buy'));
    } else if (filterIsPurchase === false) {
      setSelectedTradeTypeParams(t('auctions.sell'));
    } else {
      setSelectedTradeTypeParams(ALL_ITEMS);
    }
  }, [filterIsPurchase]);

  useEffect(() => {
    setSelectedProductValue(productsOptions[0].label);
    setSelectedTradeTypeParams(tradeTypeParams[0].label);
    setSelectedTypeSortingPrice(typeSortingPriceOptions[0].label)
  }, [i18n.language]);


  const changeProduct = (value: string | number, option: IOption) => {
    option && setSelectedProductValue(option.label);
    onChangeProduct(value);
  };

  const changeTradeType = (value: string | number, option: IOption) => {
    onChangeTradeType && onChangeTradeType(value);
    option && setSelectedTradeTypeParams(option.label);
  };

  const changeTypeSortingPrice = (value: string | number, option: IOption) => {
    option && setSelectedTypeSortingPrice(option.label)
    onChangeTypeSortingPrice && onChangeTypeSortingPrice(value);
  };

  const handleCancel = () => {
    setIsFilterModal(false);
  };

  const handleOpen = () => {
    setIsFilterModal(true);
  };

  return (
    <BaseFlex className={styles.root} justifyContent={JustifyContent.SPACE_BETWEEN}>
      <BaseFlex className={styles.selectItemWrp} flexWrap={FlexWrap.NOWRAP}>
        <BaseSelect
          value={selectedProductValue}
          className={styles.productItem}
          options={productsOptions}
          onChange={changeProduct}
        />
        {companyTradeType === 'seller_and_buyer' && typeProduct !== 'current_items'  && (
          <BaseSelect
            value={selectedTradeTypeParams}
            className={styles.transactionsItem}
            options={tradeTypeParams}
            onChange={changeTradeType}
          />
        )}
        {typeProduct === 'current_items' && (
          <BaseSelect
            value={selectedTypeSortingPrice}
            className={styles.typeSortingItem}
            options={typeSortingPriceOptions}
            onChange={changeTypeSortingPrice}
          />
        )}
      </BaseFlex>
      <BaseFlex className={styles.selectItemWrp} justifyContent={JustifyContent.END}>
        <BaseButton
          value={t<string>('auctions.filter.filters')}
          className={styles.filterBtn}
          icon={<FilterIcon />}
          onClick={handleOpen}
        />
        <SearchAuctionLot placeholder={t('auctions.searchLots')} className={styles.search} />
      </BaseFlex>
      <FilterLotsModal
        productsOptions={productsOptions}
        visible={isFilterModal}
        title={t<string>('auctions.filter.filters')}
        handleCancel={handleCancel}
        typeSortingOptions={typeSortingOptions}
        userData={userData}
        saveLotsFilterParams={saveLotsFilterParams}
        typeProduct={typeProduct ? typeProduct : ''}
      />
    </BaseFlex>
  );
};

export default LotsFilterPanel;
