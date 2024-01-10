import { connect, ConnectedProps } from 'react-redux';
import React, { useState } from 'react';
import moment from 'moment';
import * as yup from 'yup';
import { IAysAgroState } from 'store';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { buildRequired } from 'helpers/validation';
import { useRouter } from 'next/router';
import { searchNomenclatureSelector } from 'selectors/search';
import { profileProductsForBuySelector, profileProductsForSellSelector } from 'selectors/profile';
import { auctionsExpiredAtListSelector } from 'selectors/auctions';
import { FlexDirection, AlignItems, JustifyContent } from 'interfaces/flex';
import { TypeOperation } from 'interfaces/general';
import { ICreateLot } from 'interfaces/auctions';
import { IProps } from 'interfaces/props';
import { loadingUnitsList } from 'actions/general';
import { createCustomCurrentProduct } from 'actions/customCurrentProducts';
import {loadingAuctionsExpiredAtList } from 'actions/auctions';
import { loadingProductsForBuy, loadingProductsForSell } from 'actions/profile';
import CreateCustomCurrentProductStep2 from './CreateCustomCurrentProductStep2';
import CreateCustomCurrentProductStep1 from './CreateCustomCurrentProductStep1';
import BaseFlex from 'atoms/Flex';
import styles from './index.module.scss';

const getDefaultValues = (): ICreateLot => {
  const date = moment().unix();
  return {
    payment_method: 1,
    delivery_method: 1,
    nomenclature: null,
    is_purchase:  true,
    price: 0,
    prepayment_percent: null,
    comment: '',
    quantity: null,
    delivery_from: date,
    delivery_to: date,
    address: '',
    grace_period_to: date,
  };

};

const mapStateToProps = (state: IAysAgroState) => {
  return {
    products_for_buy: profileProductsForBuySelector(state),
    products_for_sell: profileProductsForSellSelector(state),
    lotsExpiredAtList: auctionsExpiredAtListSelector(state),
    searchData: searchNomenclatureSelector(state),
    units: state.general.unitsList,
  };
};

const mapDispatchToProps = {
  createCustomCurrentProduct: (data: ICreateLot, redirect: () => void) =>
  createCustomCurrentProduct(data, redirect),
  loadProductsForBuy: () => loadingProductsForBuy(),
  loadProductsForSell: () => loadingProductsForSell(),
  loadingAuctionsExpiredAtList: () => loadingAuctionsExpiredAtList(),
  loadingUnitsList: () => loadingUnitsList(),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends IProps, PropsFromRedux {
  lotTransactionType?: 'sell' | 'buy';
  lotType?: TypeOperation;
  lotTypeOperation: 'create' | 'edit';
}

const CreateCustomCurrentProduct: React.FC<Props> = ({
  createCustomCurrentProduct,
  lotTypeOperation,
  lotsExpiredAtList,
  products_for_buy,
  products_for_sell,
  loadProductsForBuy,
  loadProductsForSell,
  loadingAuctionsExpiredAtList,
  loadingUnitsList,
  units,
}) => {
  const [t] = useTranslation('common');
  const router = useRouter();
  const validationSchema = yup.object().shape({
    payment_method: yup.number().typeError(t('auctions.create.step2.required')).required(),
    delivery_method: yup.number().required('Required'),
    nomenclature: yup.number().typeError(t('auctions.create.step2.required')).required(),
    address: yup.string().when('delivery_method', buildRequired(2, t('auctions.create.step2.required'))),
    grace_period_to: yup.string().when('payment_method', { is: 2, then: yup.string().required() }),
  });

  const [currentStep, setCurrentStep] = useState(0);

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<ICreateLot>({ defaultValues: getDefaultValues(),resolver: yupResolver(validationSchema),
  });
  const data = getValues();
  const watchPaymentMethod: number | undefined = watch('payment_method', 1);
  const watchDeliveryMethod: number | undefined = watch('delivery_method', 1);
  const watchServiceType: boolean | undefined = watch('is_purchase', false);

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const redirect = () => {
    router.push('/products');
  };

  const onSubmit = () => {
    const data = getValues();
    if (currentStep === 0) {
    next()
    }
    if (currentStep === 1) {
      createCustomCurrentProduct(data, redirect);
    }
  };
  
  const steps = [
    {
      title: `${t('auctions.create.step2.title')}`,
      content: (
        <CreateCustomCurrentProductStep1
          prev={prev}
          errors={errors}
          control={control}
          lotType={'current_item'}
          lotTypeOperation={lotTypeOperation}
          lotTransactionType={data.is_purchase ? 'buy' : 'sell'}
          data={data}
          units={units}
          loadingUnitsList={loadingUnitsList}
          watchPaymentMethod={watchPaymentMethod}
          watchDeliveryMethod={watchDeliveryMethod}
          watchServiceType={watchServiceType}
          lotsExpiredAtList={lotsExpiredAtList}
          products_for_buy={products_for_buy}
          products_for_sell={products_for_sell}
          loadProductsForBuy={loadProductsForBuy}
          loadProductsForSell={loadProductsForSell}
          loadingAuctionsExpiredAtList={loadingAuctionsExpiredAtList}
        />
      ),
    },
    {
      title: `${t('auctions.create.step3.title')}`,
      content: <CreateCustomCurrentProductStep2 prev={prev} lotState={data && data} />,
    },
  ];

  return (
    <BaseFlex alignItems={AlignItems.CENTER} flexDirection={FlexDirection.COLUMN}>
      <BaseFlex className={styles.root} alignItems={AlignItems.CENTER} flexDirection={FlexDirection.COLUMN}>
        <BaseFlex className={styles.contentWrp} justifyContent={JustifyContent.CENTER}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.content}>{steps[currentStep].content}</div>
        </form>
        </BaseFlex>
      </BaseFlex>
    </BaseFlex>
  );
};

export default connector(CreateCustomCurrentProduct);
