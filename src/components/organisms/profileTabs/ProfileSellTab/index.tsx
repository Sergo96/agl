import React, { useEffect } from 'react';
import { JustifyContent } from 'interfaces/flex';
import { IAysAgroState } from 'store';
import { connect, ConnectedProps } from 'react-redux';
import { IProps } from 'interfaces/props';
import { TypeTab } from 'interfaces/auth';
import BaseFlex from 'atoms/Flex';
import BaseButton from 'atoms/Button';
import ProfileProductItem from 'molecules/ProfileProductItem';
import { profileCustomNomenclatureSelector, profileProductsForSellSelector } from 'selectors/profile';
import { IGeneralNomenclatureItem } from 'interfaces/nomenclature';
import {
  addProfileCustomNomenclature,
  addProfileNomenclature,
  loadingProductsForSell,
  updateProductsForSell,
} from 'actions/profile';
import PaginationEntry from 'entries/pagination';
import { useTranslation } from 'react-i18next';
import buttonStyles from '../ProfileCompanyInfo/index.module.scss';

const mapStateToProps = (state: IAysAgroState) => {
  return {
    products_for_sell: profileProductsForSellSelector(state),
    productsCustom: profileCustomNomenclatureSelector(state),
  };
};

const mapDispatchToProps = {
  loadProductsForSell: () => loadingProductsForSell(),
  updateProductsForSell: (data: IGeneralNomenclatureItem[], notification: string) =>
    updateProductsForSell(data, notification),
  addNomenclature: (data: IGeneralNomenclatureItem, type: TypeTab) => addProfileNomenclature(data, type),
  addCustomNomenclature: (data: IGeneralNomenclatureItem, type: TypeTab) => addProfileCustomNomenclature(data, type),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends IProps, PropsFromRedux {
  products: IGeneralNomenclatureItem[];
  nomenclature: PaginationEntry<IGeneralNomenclatureItem>;
}

const ProfileSellTab: React.FC<Props> = ({
  products,
  products_for_sell,
  productsCustom,
  nomenclature,
  loadProductsForSell,
  updateProductsForSell,
  addNomenclature,
  addCustomNomenclature,
}) => {
  const [t] = useTranslation('common');

  useEffect(() => {
    if (nomenclature.results.length > 0) {
      loadProductsForSell();
    }
  }, [nomenclature]);

  const resetValues = () => {
    loadProductsForSell();
  };

  const onHandleSubmit = (products_for_sell: IGeneralNomenclatureItem[]) => {
    updateProductsForSell(products_for_sell, t<string>('notifications.profileUpdateSuccess'));
  };

  return (
    <>
      <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN}>
        {products &&
          products.map((item) => (
            <ProfileProductItem
              type={1}
              addNomenclature={addNomenclature}
              products={products_for_sell}
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
          onClick={() => onHandleSubmit(products_for_sell)}
          className={buttonStyles.submitButton}
          value={t<string>('profile.buttons.save')}
          size="large"
          type="primary"
        />
      </BaseFlex>
    </>
  );
};

export default connector(ProfileSellTab);
