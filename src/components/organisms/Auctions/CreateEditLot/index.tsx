import { connect, ConnectedProps } from 'react-redux';
import React, { useState, useEffect } from 'react';
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
import { createLot, loadingAuctionsExpiredAtList, submitBet } from 'actions/auctions';
import { loadingProductsForBuy, loadingProductsForSell } from 'actions/profile';
import BaseFlex from 'atoms/Flex';
import CreateLotStep1 from './CreateEditLotStep1';
import CreateEditLotStep2 from './CreateEditLotStep2';
import CreateLotStep3 from './CreateEditLotStep3';
import styles from './index.module.scss';

const getDefaultValues = (type: 'buy' | 'sell', data: ICreateLot): ICreateLot => {
  const {
    price,
    payment_method,
    prepayment_percent,
    grace_period_to,
    quantity,
    units,
    delivery_from,
    delivery_to,
    address,
    delivery_method,
    nomenclature,
    expired_at,
  } = data;

  const date = moment().unix();
  return {
    payment_method: payment_method ? payment_method : 1,
    delivery_method: delivery_method ? delivery_method : 1,
    nomenclature: nomenclature ? nomenclature : null,
    is_purchase: type === 'buy' ? true : false,
    price: price ? price : 0,
    prepayment_percent: prepayment_percent ? prepayment_percent : null,
    comment: '',
    quantity: quantity,
    units: units ? units : 1,
    delivery_from: delivery_from ? delivery_from : date,
    delivery_to: delivery_to ? delivery_to : date,
    address: address ? address : '',
    expired_at: expired_at ?  expired_at : undefined,
    grace_period_to: grace_period_to ? grace_period_to : date,
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
  createLot: (data: ICreateLot, typeOperation: TypeOperation, redirect: () => void) =>
    createLot(data, typeOperation, redirect),
  submitBet: (data: ICreateLot, id: string, typeOperation: TypeOperation, notification: any, redirect: () => void) =>
    submitBet(data, id, typeOperation, notification, redirect),
  loadProductsForBuy: () => loadingProductsForBuy(),
  loadProductsForSell: () => loadingProductsForSell(),
  loadingAuctionsExpiredAtList: () => loadingAuctionsExpiredAtList(),
  loadingUnitsList: () => loadingUnitsList(),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends IProps, PropsFromRedux {
  type?: 'sell' | 'buy';
  lotType?: TypeOperation;
  lotTypeOperation: 'create' | 'edit';
}

const CreateEditLot: React.FC<Props> = ({
  type='sell',
  createLot,
  lotTypeOperation,
  lotsExpiredAtList,
  products_for_buy,
  products_for_sell,
  loadProductsForBuy,
  loadProductsForSell,
  loadingAuctionsExpiredAtList,
  loadingUnitsList,
  units,
  lotType,
  submitBet,
}) => {
  const [t] = useTranslation('common');
  const router = useRouter();
  const validationSchema = yup.object().shape({
    payment_method: yup.number().typeError(t('auctions.create.step2.required')).required(),
    delivery_method: yup.number().required('Required'),
    nomenclature: yup.number().typeError(t('auctions.create.step2.required')).required(),
    is_purchase: yup.boolean().required('Required'),
    quantity: yup.number().typeError('Required').positive().integer().required(),
    units: yup.string().required('Required'),
    address: yup.string().when('delivery_method', buildRequired(2, t('auctions.create.step2.required'))),
    grace_period_to: yup.string().when('payment_method', { is: 2, then: yup.string().required() }),
  });

  const { id } = router.query;

  const formParams: ICreateLot = {
    price: Number(router.query.price),
    payment_method: Number(router.query.payment_method),
    prepayment_percent: Number(router.query.prepayment_percent),
    grace_period_to: Number(router.query.grace_period_to),
    quantity: Number(router.query.quantity),
    units: Number(router.query.units),
    delivery_from: Number(router.query.delivery_from),
    delivery_to: Number(router.query.delivery_to),
    address: router.query.address as string,
    delivery_method: Number(router.query.delivery_method),
    nomenclature: Number(router.query.nomenclature),
    expired_at: Number(router.query.expired_at),
}

  const [currentStep, setCurrentStep] = useState(0);
  const [typeOperation, setTypeOperation] = useState<TypeOperation>('auction');

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<ICreateLot>({ defaultValues: getDefaultValues(type, formParams),resolver: yupResolver(validationSchema),
  });
  const data = getValues();
  const watchPaymentMethod: number | undefined = watch('payment_method', 1);
  const watchDeliveryMethod: number | undefined = watch('delivery_method', 1);

  useEffect(() => {
    lotType &&  setTypeOperation(lotType)
  }, [lotType])

  useEffect(() => {
    lotType && setTypeOperation(lotType);
    lotType && setCurrentStep(1);
    lotTypeOperation === 'edit' && setCurrentStep(1);
  }, [lotType, lotTypeOperation]);

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const back = () => router.push('/auctions')

  const selectTypeLot = (value: TypeOperation) => {
    setTypeOperation(value);
  };

  const redirect = () => {
    router.push('/auctions');
  };

  const onSubmit = () => { 
    if (currentStep === 1) {
      const data = getValues();
      const sendedParams = {
        ...data,
        conditions_accepted: false
      }
      const  notification = {
        updatedBid: t('notifications.updatedBid'),
        successfulBid: t('notifications.successfulBid'),
       }
      lotTypeOperation === 'edit' && id ? submitBet(sendedParams, id as string, typeOperation, notification, redirect) : next();
    }
    if (currentStep === 2) {
      createLot(data, typeOperation, redirect);
    }
  };

  const steps = [
    {
      title: `${t('auctions.create.step2.title')}`,
      content: (
        <CreateEditLotStep2
          prev={prev}
          back={back}
          next={next}
          errors={errors}
          control={control}
          lotType={typeOperation}
          lotTypeOperation={lotTypeOperation}
          lotTransactionType={type}
          data={data}
          units={units}
          loadingUnitsList={loadingUnitsList}
          watchPaymentMethod={watchPaymentMethod}
          watchDeliveryMethod={watchDeliveryMethod}
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
      content: <CreateLotStep3 prev={prev} lotState={data && data} />,
    },
  ];

  return (
    <BaseFlex alignItems={AlignItems.CENTER} flexDirection={FlexDirection.COLUMN}>
      <BaseFlex className={styles.root} alignItems={AlignItems.CENTER} flexDirection={FlexDirection.COLUMN}>
        <BaseFlex className={styles.contentWrp} justifyContent={JustifyContent.CENTER}>
          {currentStep === 0 ? (
            <CreateLotStep1 next={next} selectTypeLot={selectTypeLot} typeOperation={typeOperation} />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.content}>{steps[currentStep - 1].content}</div>
            </form>
          )}
        </BaseFlex>
      </BaseFlex>
    </BaseFlex>
  );
};

export default connector(CreateEditLot);
