import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IAysAgroState } from 'store';
import { JustifyContent } from 'interfaces/flex';
import { IGeneralNomenclatureItem } from 'interfaces/nomenclature';
import { addNomenclature, addCustomNomenclature } from 'actions/auth';
import {
  loadingProductsForBuySelector,
  numberOfSelectedItemsForBuySelector,
  loadingProductsForSellSelector,
  loadingCustomNomencalture,
} from 'selectors/auth';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import BaseButton from 'atoms/Button';
import NomenclatureModal from 'molecules/NomenclatureModal';
import styles from './index.module.scss';
import { TypeTab } from 'interfaces/auth';

const mapDispatchToProps = {
  addNomenclature: (data: IGeneralNomenclatureItem, type: TypeTab) => addNomenclature(data, type),
  addCustomNomenclature: (data: IGeneralNomenclatureItem, type: TypeTab) => addCustomNomenclature(data, type),
};

const mapStateToProps = (state: IAysAgroState) => ({
  number_of_selected_items: numberOfSelectedItemsForBuySelector(state),
  products_for_buy: loadingProductsForBuySelector(state),
  products_for_sell: loadingProductsForSellSelector(state),
  products_add: loadingCustomNomencalture(state),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  value: string;
  type: TypeTab;
  id: number;
}

const ProductItem: React.FC<Props> = ({
  type,
  value,
  id,
  addNomenclature,
  products_for_buy,
  products_for_sell,
  addCustomNomenclature,
  products_add,
}) => {
  const [t] = useTranslation('common');
  const [btnValue, setBtnValue] = useState<number>(0);
  const [isNomenclatureModalOpen, setIsProfileNomenclatureModal] = useState(false);

  useEffect(() => {
    if (type === 0) {
      const value = countSelectedItems();
      setBtnValue(value);
    } else if (type === 1) {
      const value = countSelectedItems();
      setBtnValue(value);
    }
  }, [products_for_buy, products_for_sell, products_add]);
  const countSelectedItems = () => {
    if (type === 0) {
      const product_for_buy = products_for_buy ? products_for_buy.filter((i) => i?.category?.id === id).length : 0;
      const product_add = products_add
        ? products_add.filter((i) => i.available_for_buy && i?.category?.id === id).length
        : 0;
      const result = product_for_buy + product_add;
      return result;
    } else {
      const product_for_sell = products_for_sell ? products_for_sell.filter((i) => i?.category?.id === id).length : 0;
      const product_add = products_add
        ? products_add.filter((i) => i.available_for_sell && i?.category?.id === id).length
        : 0;
      const result = product_for_sell + product_add;
      return result;
    }
  };

  const showModal = () => {
    setIsProfileNomenclatureModal(true);
  };

  const closeModal = () => {
    setIsProfileNomenclatureModal(false);
  };

  const toggleCheckbox = (item: IGeneralNomenclatureItem, type: TypeTab) => {
    addNomenclature(item, type);
    setBtnValue(btnValue + 1);
  };

  return (
    <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN} className={styles.wrp}>
      <BaseTypography className={styles.item} value={value} />
      <BaseButton
        className={btnValue ? styles.btn : styles.defaultBtn}
        shape="round"
        type={btnValue ? 'primary' : 'link'}
        value={btnValue ? `${t('registration.step4.selected')} ${btnValue}` : `${t('registration.step4.select')}`}
        onClick={showModal}
      />
      {isNomenclatureModalOpen && (
        <NomenclatureModal
          type={type}
          categoryId={id}
          title={value}
          isNomenclatureModalOpen={isNomenclatureModalOpen}
          closeModal={closeModal}
          toggleCheckbox={toggleCheckbox}
          toggleCustomCheckbox={addCustomNomenclature}
        />
      )}
    </BaseFlex>
  );
};

export default connector(ProductItem);
