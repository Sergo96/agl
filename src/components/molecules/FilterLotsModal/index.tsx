import { IProps } from 'interfaces/props';
import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import Modal from 'antd/lib/modal/Modal';
import { CloseOutlined } from '@ant-design/icons';
import { ILotsParams } from 'interfaces/auctions';
import { IRegistrationData } from 'interfaces/auth';
import { IOption } from 'interfaces/options';
import BaseTypography from 'atoms/Typography';
import BaseRadioButton from 'atoms/RadioButton';
import BaseButton from 'atoms/Button';
import BaseInput from 'atoms/Input';
import BaseFlex from 'atoms/Flex';
import BaseSelect from 'atoms/Select';
import styles from './index.module.scss';

interface Props extends IProps {
  title: string;
  visible: boolean;
  confirmLoading?: boolean;
  handleCancel: () => void;
  productsOptions: IOption[];
  typeSortingOptions: IOption[];
  userData: IRegistrationData | null;
  typeProduct: string;
  saveLotsFilterParams: (filterParams: ILotsParams ) => void;
}

const FilterLotsModal: React.FC<Props> = ({
  title,
  visible,
  handleCancel,
  productsOptions,
  typeSortingOptions,
  userData,
  typeProduct,
  saveLotsFilterParams,
}) => {
  const [t] = useTranslation('common');
  const ALL_ITEMS = `${t('auctions.all')}`;

  const [filterModalParams, setFilterModalParams] = useState<ILotsParams>({
    company: '',
    category: '',
    nomenclature: '',
    delivery_method: '',
    payment_method: '1',
    tradeType: `${t('auctions.buy')}`,
    is_purchase: true,
    quantity: { minValue: '', maxValue: '' },
    price: { minValue: '', maxValue: '' },
    typeSorting: '',
  });

  const [modalTypeSorting, setModalTypeSorting] = useState<string>(filterModalParams.typeSorting);
  const [selectedModalProduct, setSelectedModalProduct] = useState<string>('');

  const onChangeModalProduct = (value: string | number, option: IOption) => {
    const category = value === ALL_ITEMS ? '' : value.toString();
    option && setSelectedModalProduct(option.label);
    setFilterModalParams({ ...filterModalParams, category });
  };

  const onChangeModalTradeType = (e: RadioChangeEvent) => {
    setFilterModalParams({
      ...filterModalParams,
      tradeType: e.target.value,
      is_purchase: e.target.value === `${t('auctions.buy')}` ? true : false,
    });
  };

  const onChangeModalTypeSorting = (value: string | number) => {
    setModalTypeSorting(value.toString());
    setFilterModalParams({ ...filterModalParams, typeSorting: value.toString() });
  };

  const onChangePaymentType = (e: RadioChangeEvent) => {
    setFilterModalParams({ ...filterModalParams, payment_method: e.target.value });
  };

  const onChangePrice = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    setFilterModalParams({
      ...filterModalParams,
      price: {
        ...filterModalParams.price,
        [type]: e.target.value,
      },
    });
  };

  const onChangeQuantity = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    setFilterModalParams({
      ...filterModalParams,
      quantity: {
        ...filterModalParams.quantity,
        [type]: e.target.value,
      },
    });
  };

  const handleOk = () => {
    saveLotsFilterParams(filterModalParams)
    handleCancel();
  };

  return (
    <Modal
      title={title}
      visible={visible}
      className={styles.wrp}
      onOk={handleOk}
      bodyStyle={{ height: 480 }}
      width={'100%'}
      closeIcon={<CloseOutlined onClick={handleCancel} />}
      footer={[
        <BaseButton
          className={styles.defaultBtn}
          value={t<string>('registration.step4.close')}
          onClick={handleCancel}
        />,
        <BaseButton
          className={styles.saveBtn}
          type="primary"
          value={t<string>('registration.step4.save')}
          onClick={handleOk}
        />,
      ]}
    >
      <BaseSelect
        value={modalTypeSorting}
        className={styles.selectItem}
        defaultValue={t('auctions.all')}
        size="large"
        options={typeSortingOptions}
        onChange={onChangeModalTypeSorting}
      />
      <BaseSelect
        size="large"
        defaultValue={t('auctions.all')}
        value={selectedModalProduct}
        className={styles.selectItem}
        onChange={onChangeModalProduct}
        options={productsOptions}
      />

      {userData?.company?.trade_type === 'seller_and_buyer' && typeProduct !== 'current_items' ? (
        <BaseFlex>
          <BaseTypography value={t<string>('auctions.filter.type')} className={styles.titleBtn} />
          <Radio.Group onChange={onChangeModalTradeType} value={filterModalParams.tradeType} className={styles.grid}>
            <BaseRadioButton value={t<string>('auctions.buy')} label={t('auctions.buy')} className={styles.item} />
            <BaseRadioButton value={t<string>('auctions.sell')} label={t('auctions.sell')} className={styles.item} />
          </Radio.Group>
        </BaseFlex>
      ) : null}

      <BaseFlex>
        <BaseTypography value={t<string>('auctions.filter.paymentType')} className={styles.titleBtn} />
        <Radio.Group onChange={onChangePaymentType} value={filterModalParams.payment_method} className={styles.grid}>
          <BaseRadioButton value="1" label={t('auctions.filter.prePayment')} className={styles.item} />
          <BaseRadioButton value="2" label={t('auctions.filter.defferal')} className={styles.item} />
        </Radio.Group>
      </BaseFlex>
      <BaseFlex>
        <BaseTypography value={t<string>('auctions.filter.indicateQuantity')} className={styles.titleBtn} />
        <div className={styles.grid}>
          <BaseInput
            type="number"
            value={filterModalParams.quantity.minValue}
            onChange={(val) => onChangeQuantity(val, 'minValue')}
            className={styles.item}
          />
          <BaseInput
            type="number"
            value={filterModalParams.quantity.maxValue}
            onChange={(val) => onChangeQuantity(val, 'maxValue')}
            className={styles.item}
          />
        </div>
      </BaseFlex>
      <BaseFlex>
        <BaseTypography value={t<string>('auctions.filter.indicatePrice')} className={styles.titleBtn} />
        <div className={styles.grid}>
          <BaseInput
            type="number"
            className={styles.item}
            value={filterModalParams.price.minValue}
            onChange={(val) => onChangePrice(val, 'minValue')}
          />
          <BaseInput
            type="number"
            className={styles.item}
            value={filterModalParams.price.maxValue}
            onChange={(val) => onChangePrice(val, 'maxValue')}
          />
        </div>
      </BaseFlex>
    </Modal>
  );
};

export default React.memo(FilterLotsModal);
