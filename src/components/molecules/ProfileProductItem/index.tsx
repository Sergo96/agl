import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { JustifyContent } from 'interfaces/flex';
import { IGeneralNomenclatureItem } from 'interfaces/nomenclature';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import BaseButton from 'atoms/Button';
import NomenclatureModal from 'molecules/NomenclatureModal';
import styles from './index.module.scss';
import { IProps } from 'interfaces/props';
import { TypeTab } from 'interfaces/auth';

interface Props extends IProps {
  value: string;
  type: TypeTab;
  id: number;
  addNomenclature: (data: IGeneralNomenclatureItem, type: TypeTab) => void;
  products: IGeneralNomenclatureItem[];
  addCustomNomenclature: (data: IGeneralNomenclatureItem, type: TypeTab) => void;
  productsCustom: IGeneralNomenclatureItem[];
}

const ProfileProductItem: React.FC<Props> = ({
  type,
  value,
  id,
  addNomenclature,
  products,
  addCustomNomenclature,
  productsCustom,
}) => {
  const [t] = useTranslation('common');
  const [btnValue, setBtnValue] = useState<number>(0);
  const [isNomenclatureModalOpen, setIsProfileNomenclatureModal] = useState<boolean>(false);
  useEffect(() => {
    const value = countSelectedItems();
    setBtnValue(value);
  }, [products, productsCustom]);
  const countSelectedItems = () => {
    const product = products ? products.filter((i) => i?.category?.id === id).length : 0;
    const product_add = productsCustom
      ? productsCustom.filter((i) => i.available_for_buy && i.category?.id === id).length
      : 0;
    const result = product + product_add;
    return result;
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
          isProfile
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

export default ProfileProductItem;
