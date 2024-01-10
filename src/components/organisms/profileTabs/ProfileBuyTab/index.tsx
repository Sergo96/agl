import React, { useEffect } from 'react';
import { JustifyContent } from 'interfaces/flex';
import { IAysAgroState } from 'store';
import { connect, ConnectedProps } from 'react-redux';
import { IGeneralNomenclatureItem } from 'interfaces/nomenclature';
import { useTranslation } from 'react-i18next';
import { IProps } from 'interfaces/props';
import { TypeTab } from 'interfaces/auth';
import {
  addProfileCustomNomenclature,
  addProfileNomenclature,
  loadingProductsForBuy,
  updateProductsForBuy,
} from 'actions/profile';
import BaseFlex from 'atoms/Flex';
import BaseButton from 'atoms/Button';
import ProfileProductItem from 'molecules/ProfileProductItem';
import { profileCustomNomenclatureSelector, profileProductsForBuySelector } from 'selectors/profile';
import PaginationEntry from 'entries/pagination';
import buttonStyles from '../ProfileCompanyInfo/index.module.scss';

const mapStateToProps = (state: IAysAgroState) => {
  return {
    products_for_buy: profileProductsForBuySelector(state),
    productsCustom: profileCustomNomenclatureSelector(state),
  };
};

const mapDispatchToProps = {
  loadProductsForBuy: () => loadingProductsForBuy(),
  updateProductsForBuy: (data: IGeneralNomenclatureItem[], notification: string) =>
    updateProductsForBuy(data, notification),
  addNomenclature: (data: IGeneralNomenclatureItem, type: TypeTab) => addProfileNomenclature(data, type),
  addCustomNomenclature: (data: IGeneralNomenclatureItem, type: TypeTab) => addProfileCustomNomenclature(data, type),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends IProps, PropsFromRedux {
  products: IGeneralNomenclatureItem[];
  nomenclature: PaginationEntry<IGeneralNomenclatureItem>;
}

const ProfileBuyTab: React.FC<Props> = ({
  products,
  products_for_buy,
  productsCustom,
  nomenclature,
  loadProductsForBuy,
  updateProductsForBuy,
  addNomenclature,
  addCustomNomenclature,
}) => {
  const [t] = useTranslation('common');

  useEffect(() => {
    if (nomenclature.results.length > 0) {
      loadProductsForBuy();
    }
  }, [nomenclature]);

  const resetValues = () => {
    loadProductsForBuy();
  };
  const onHandleSubmit = (products_for_buy: IGeneralNomenclatureItem[]) => {
    const selectedProductsForBuy = [...products_for_buy, ...productsCustom];
    updateProductsForBuy(selectedProductsForBuy, t<string>('notifications.profileUpdateSuccess'));
  };
  return (
    <>
      <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN}>
        {products &&
          products.map((item) => (
            <ProfileProductItem
              type={0}
              addNomenclature={addNomenclature}
              products={products_for_buy}
              addCustomNomenclature={addCustomNomenclature}
              productsCustom={productsCustom}
              key={item.id}
              id={item.id}
              value={item.name}
            />
          ))}
      </BaseFlex>
      <BaseFlex justifyContent={JustifyContent.END} className={buttonStyles.buttons}>
        <BaseButton
          className={buttonStyles.cancelButton}
          onClick={resetValues}
          value={t<string>('profile.buttons.cancel')}
          size="large"
          type="default"
          htmlType="button"
        />
        <BaseButton
          onClick={() => onHandleSubmit(products_for_buy)}
          htmlType="button"
          className={buttonStyles.submitButton}
          value={t<string>('profile.buttons.save')}
          size="large"
          type="primary"
        />
      </BaseFlex>
    </>
  );
};
export default connector(ProfileBuyTab);
