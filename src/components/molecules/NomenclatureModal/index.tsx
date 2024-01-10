import { IProps } from 'interfaces/props';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { IAysAgroState } from 'store';
import Modal from 'antd/lib/modal/Modal';
import { PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { loadingNomenclatureById, createCustomNomenclature } from 'actions/nomenclature';
import { nomenclatureByIdSelector } from 'selectors/nomenclature';
import {
  loadingProductsForBuySelector,
  loadingProductsForSellSelector,
  loadingCustomNomencalture,
} from 'selectors/auth';
import { IGeneralNomenclatureItem } from 'interfaces/nomenclature';
import { JustifyContent } from 'interfaces/flex';
import BaseTypography from 'atoms/Typography';
import BaseCheckbox from 'atoms/Checkbox';
import BaseButton from 'atoms/Button';
import BaseInput from 'atoms/Input';
import BaseFlex from 'atoms/Flex';
import styles from './index.module.scss';
import {
  profileCustomNomenclatureSelector,
  profileProductsForBuySelector,
  profileProductsForSellSelector,
} from 'selectors/profile';
import { TypeTab } from 'interfaces/auth';

const mapDispatchToProps = {
  loadingNomenclature: (id: number) => loadingNomenclatureById(id),
  createCustomNomenclature: (data: IGeneralNomenclatureItem) => createCustomNomenclature(data),
};

const mapStateToProps = (state: IAysAgroState) => {
  return {
    nomenclature: nomenclatureByIdSelector(state),
    products_for_buy: loadingProductsForBuySelector(state),
    products_for_sell: loadingProductsForSellSelector(state),
    products_add: loadingCustomNomencalture(state),
    profile_products_for_buy: profileProductsForBuySelector(state),
    profile_products_for_sell: profileProductsForSellSelector(state),
    profile_products_add: profileCustomNomenclatureSelector(state),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends IProps, PropsFromRedux {
  isProfile?: boolean;
  title: string;
  type: TypeTab;
  isNomenclatureModalOpen: boolean;
  confirmLoading?: boolean;
  closeModal: () => void;
  categoryId: number;
  toggleCheckbox: (item: IGeneralNomenclatureItem, type: TypeTab) => void;
  toggleCustomCheckbox: (data: IGeneralNomenclatureItem, type: TypeTab) => void;
}

interface IFormInputs {
  newNomenclature: string;
}
const NomenclatureModal: React.FC<Props> = ({
  isProfile,
  type,
  products_for_buy,
  products_for_sell,
  products_add,
  profile_products_for_buy,
  profile_products_for_sell,
  profile_products_add,
  toggleCheckbox,
  nomenclature,
  loadingNomenclature,
  title = 'Витамины',
  isNomenclatureModalOpen,
  closeModal,
  categoryId,
  createCustomNomenclature,
  toggleCustomCheckbox,
}) => {
  const [t] = useTranslation('common');
  const [generalNomenclature, setGeneralNomenclature] = useState<IGeneralNomenclatureItem[]>([]);
  const [customNomenclature, setCustomNomenclature] = useState<IGeneralNomenclatureItem[]>([]);
  const { control, handleSubmit, reset } = useForm<IFormInputs>();

  useEffect(() => {
    loadingNomenclature(categoryId);
  }, []);

  useEffect(() => {
    const customItems = nomenclature ? nomenclature.filter((i: IGeneralNomenclatureItem) => i.custom) : [];
    const generalItems = nomenclature.filter((i: IGeneralNomenclatureItem) => !i.custom);
    setCustomNomenclature(customItems);
    setGeneralNomenclature(generalItems);
  }, [nomenclature]);

  const isProductChecked = useCallback(
    (id: number) => {
      if (isProfile) {
        return type === 0
          ? profile_products_for_buy?.some((i: IGeneralNomenclatureItem) => i.id === id)
          : profile_products_for_sell?.some((i: IGeneralNomenclatureItem) => i.id === id);
      } else if (!isProfile) {
        return type === 0
          ? products_for_buy?.some((i: IGeneralNomenclatureItem) => i.id === id)
          : products_for_sell?.some((i: IGeneralNomenclatureItem) => i.id === id);
      }
      return false;
    },
    [isProfile, type, profile_products_for_buy, profile_products_for_sell, products_for_buy, products_for_sell]
  );
  const isCustomProductChecked = useCallback(
    (item: string) => {
      if (isProfile) {
        return type === 0
          ? profile_products_add &&
              profile_products_add
                .filter((i) => i.available_for_buy)
                .some((i: IGeneralNomenclatureItem) => i.name === item)
          : profile_products_add &&
              profile_products_add
                .filter((i) => i.available_for_sell)
                .some((i: IGeneralNomenclatureItem) => i.name === item);
      } else if (!isProfile) {
        return type === 0
          ? products_add &&
              products_add.filter((i) => i.available_for_buy).some((i: IGeneralNomenclatureItem) => i.name === item)
          : products_add &&
              products_add.filter((i) => i.available_for_sell).some((i: IGeneralNomenclatureItem) => i.name === item);
      }
      return false;
    },
    [isProfile, type, profile_products_add, products_add]
  );
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const item: IGeneralNomenclatureItem = {
      name: data.newNomenclature,
      approved: false,
      available_for_sell: type === 1 && true,
      available_for_buy: type === 0 && true,
      category: {
        id: categoryId,
        name: title,
      },
      custom: true,
      id: Date.now(),
    };
    createCustomNomenclature(item);
    reset({
      newNomenclature: '',
    });
  };
  return (
    <Modal
      title={title}
      visible={isNomenclatureModalOpen}
      className={styles.wrp}
      onOk={closeModal}
      bodyStyle={{ height: 480 }}
      width={'100%'}
      closeIcon={<CloseOutlined onClick={closeModal} />}
      footer={[
        <BaseButton className={styles.defaultBtn} value={t<string>('registration.step4.close')} onClick={closeModal} />,
        <BaseButton
          className={styles.saveBtn}
          type="primary"
          value={t<string>('registration.step4.save')}
          onClick={closeModal}
        />,
      ]}
    >
      {generalNomenclature && (
        <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN} className={styles.itemsWrp}>
          {generalNomenclature.map((item: IGeneralNomenclatureItem) => (
            <BaseCheckbox
              className={styles.item}
              key={item.name}
              checked={isProductChecked(item.id)}
              value={item.name}
              label={item.name}
              onChange={() => toggleCheckbox(item, type)}
            />
          ))}
        </BaseFlex>
      )}
      <BaseTypography className={styles.subtitle} value={t<string>('registration.step4.customProducts')} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN}>
          <Controller
            name="newNomenclature"
            control={control}
            render={({ field: { ref, ...rest } }) => <BaseInput {...rest} className={styles.input} />}
          />
          <BaseButton
            className={styles.btnCreate}
            size="large"
            type="primary"
            value={t<string>('registration.step4.create')}
            icon={<PlusCircleOutlined />}
          />
        </BaseFlex>
      </form>
      {customNomenclature && (
        <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN} className={styles.customItemsWrp}>
          {customNomenclature.map((item: IGeneralNomenclatureItem) => (
            <BaseCheckbox
              className={styles.item}
              key={item.name}
              checked={isCustomProductChecked(item.name)}
              value={item.name}
              label={item.name}
              onChange={() => toggleCustomCheckbox(item, type)}
            />
          ))}
        </BaseFlex>
      )}
    </Modal>
  );
};

export default connector(NomenclatureModal);
