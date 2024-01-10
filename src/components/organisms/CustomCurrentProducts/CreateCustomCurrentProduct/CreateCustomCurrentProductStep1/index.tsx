import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Control, DeepMap, FieldError } from 'react-hook-form';
import { IProps } from 'interfaces/props';
import { FlexDirection, JustifyContent } from 'interfaces/flex';
import { IGeneralNomenclatureItem } from 'interfaces/nomenclature';
import { ICreateLot, IExpiredAtTime } from 'interfaces/auctions';
import { TypeOperation, IBaseDTO } from 'interfaces/general';
import CreateLotSelectProduct from 'molecules/CreateLotSelectProduct';
import CreateEditLotSelectPaymentMethod from 'molecules/CreateEditLotSelectPaymentMethod';
import CreateLotServiceType from 'molecules/CreateLotServiceType';
import CreateLotProductPriceForTon from 'molecules/CreateLotProductPriceForTon';
import CreateEditLotDeliveryPeriod from 'molecules/CreateEditLotDeliveryPeriod';
import BaseFlex from 'atoms/Flex';
import BaseButton from 'atoms/Button';
import BaseTypography from 'atoms/Typography';
import styles from './../index.module.scss';

interface Props extends IProps {
  lotType: TypeOperation;
  lotTypeOperation: 'create' | 'edit';
  lotTransactionType: 'sell' | 'buy';
  data: ICreateLot;
  control: Control<ICreateLot>;
  errors: DeepMap<ICreateLot, FieldError>;
  watchPaymentMethod?: number;
  watchDeliveryMethod?: number;
  watchServiceType?: boolean;
  products_for_buy: IGeneralNomenclatureItem[];
  products_for_sell: IGeneralNomenclatureItem[];
  loadProductsForBuy: () => void;
  loadProductsForSell: () => void;
  loadingAuctionsExpiredAtList: () => void;
  lotsExpiredAtList: IExpiredAtTime[];
  loadingUnitsList: () => void;
  units: IBaseDTO[];
  next?: () => void;
  prev?: () => void;
}

const CreateCustomCurrentProductStep1: React.FC<Props> = ({
  control,
  data,
  errors,
  lotType,
  lotTypeOperation,
  loadProductsForBuy,
  products_for_buy,
  products_for_sell,
  loadProductsForSell,
  loadingAuctionsExpiredAtList,
  watchPaymentMethod,
  watchDeliveryMethod,
  watchServiceType,
  loadingUnitsList,
}) => {
  const [t] = useTranslation('common');

  useEffect(() => {
    loadProductsForBuy();
    loadProductsForSell();
    loadingAuctionsExpiredAtList();
    loadingUnitsList();
  }, []);

  return (
    <BaseFlex flexDirection={FlexDirection.COLUMN}>
        <BaseTypography
          weight="bold"
          size="xl"
          className={styles.header}
          value={t<string>('customCurrentProducts.step1.header')}
        />
      <CreateLotServiceType
        control={control}
        error={errors.is_purchase}
        data={data}
        header={t<string>('auctions.create.step2.title1CustomCurrentProduct')}
      />
      {lotTypeOperation === 'create' ? (
        <CreateLotSelectProduct
          error={errors.nomenclature}
          control={control}
          product={watchServiceType ? products_for_sell : products_for_buy}
          header={t('auctions.create.step2.title2CustomCurrentProduct')}
        />
      ) : null}

      <CreateEditLotSelectPaymentMethod
        error={errors.prepayment_percent}
        control={control}
        data={data}
        header={t<string>('auctions.create.step2.title3CustomCurrentProduct')}
        watchPaymentMethod={watchPaymentMethod}
      />

      <CreateEditLotDeliveryPeriod
        header={
          lotTypeOperation === 'create'
            ? t<string>('auctions.create.step2.title4')
            : t<string>('auctions.create.step2.title3Edit')
        }
        error={errors.address}
        control={control}
        data={data}
        watchDeliveryMethod={watchDeliveryMethod}
      />

      <CreateLotProductPriceForTon control={control} error={errors.price} />
      <BaseFlex justifyContent={JustifyContent.END} flexDirection={FlexDirection.ROW} className={styles.stepsAction}>
        <BaseButton
          className={styles.btnNext}
          type="primary"
          value={t<string>('auctions.create.navigation.nextStep')}
        />
      </BaseFlex>
    </BaseFlex>
  );
};

export default React.memo(CreateCustomCurrentProductStep1);
