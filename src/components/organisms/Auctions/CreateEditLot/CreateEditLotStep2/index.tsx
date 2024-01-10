import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Control, DeepMap, FieldError } from 'react-hook-form';
import { IProps } from 'interfaces/props';
import { FlexDirection, JustifyContent } from 'interfaces/flex';
import { ArrowsNavigation } from 'interfaces/auth';
import { IGeneralNomenclatureItem } from 'interfaces/nomenclature';
import { ICreateLot, IExpiredAtTime } from 'interfaces/auctions';
import { TypeOperation, IBaseDTO } from 'interfaces/general';
import CreateLotSelectProduct from '../../../../molecules/CreateLotSelectProduct';
import CreateLotSelectPaymentMethod from '../../../../molecules/CreateEditLotSelectPaymentMethod';
import CreateLotIndicateValue from '../../../../molecules/CreateEditLotIndicateValue';
import CreateLotDeliveryPeriod from '../../../../molecules/CreateEditLotDeliveryPeriod';
import CreateLotDuration from '../../../../molecules/CreateLotDuration';
import CreateLotSelectStartingPrice from '../../../../molecules/CreateLotSelectStartingPrice';
import EditLotPlaceBet from '../../../../molecules/EditLotPlaceBet';
import BaseFlex from 'atoms/Flex';
import BaseButton from 'atoms/Button';
import BaseTypography from 'atoms/Typography';
import styles from './../index.module.scss';

interface Props extends IProps, ArrowsNavigation {
  lotType: TypeOperation;
  lotTypeOperation: 'create' | 'edit';
  lotTransactionType: 'sell' | 'buy';
  data: ICreateLot;
  control: Control<ICreateLot>;
  errors: DeepMap<ICreateLot, FieldError>;
  watchPaymentMethod?: number;
  watchDeliveryMethod?: number;
  products_for_buy: IGeneralNomenclatureItem[];
  products_for_sell: IGeneralNomenclatureItem[];
  loadProductsForBuy: () => void;
  loadProductsForSell: () => void;
  loadingAuctionsExpiredAtList: () => void;
  lotsExpiredAtList: IExpiredAtTime[];
  loadingUnitsList: () => void;
  units: IBaseDTO[];
  back: () => void
}

const CreateEditLotStep2: React.FC<Props> = ({
  prev,
  back,
  control,
  data,
  errors,
  lotType,
  lotTypeOperation,
  lotTransactionType,
  loadProductsForBuy,
  products_for_buy,
  products_for_sell,
  loadProductsForSell,
  loadingAuctionsExpiredAtList,
  lotsExpiredAtList,
  watchPaymentMethod,
  watchDeliveryMethod,
  loadingUnitsList,
  units,
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
      {lotType === 'auction' ||
        ('commercial_offer' && (
          <BaseFlex flexDirection={FlexDirection.COLUMN}>
            <BaseTypography
              size="sm"
              color="primary"
              weight="medium"
              value={t<string>('auctions.create.step2.title')}
            />
          </BaseFlex>
        ))}
      {lotTypeOperation === 'edit' ? (
        <BaseTypography
          weight="bold"
          size="xl"
          className={styles.header}
          value={t<string>('auctions.editConditions')}
        />
      ) : null}
      {lotTypeOperation === 'create' ? (
        <BaseTypography
          weight="bold"
          size="xl"
          className={styles.header}
          value={t<string>('auctions.create.step2.headerAuction')}
        />
      ) : null}
      {lotTypeOperation === 'create' ? (
        <CreateLotSelectProduct
          error={errors.nomenclature}
          control={control}
          product={lotTransactionType === 'sell' ? products_for_sell : products_for_buy}
          header={t('auctions.create.step2.title1CustomCurrentProduct')}
        />
      ) : null}
      <CreateLotSelectPaymentMethod
        error={errors.prepayment_percent}
        control={control}
        data={data}
        header={
          lotTypeOperation === 'create'
            ? t<string>('auctions.create.step2.title2')
            : t<string>('auctions.create.step2.title1Edit')
        }
        watchPaymentMethod={watchPaymentMethod}
      />
      <CreateLotIndicateValue
        header={
          lotTypeOperation === 'create'
            ? t<string>('auctions.create.step2.title3')
            : t<string>('auctions.create.step2.title2Edit')
        }
        units={units}
        data={data}
        error={errors.quantity}
        control={control}
      />
      <CreateLotDeliveryPeriod
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

      {lotTypeOperation === 'edit' ? <EditLotPlaceBet control={control} error={errors.price} /> : null}

      {lotTypeOperation === 'create' ? (
        <CreateLotDuration
          typeOperation={lotType}
          error={errors.expired_at}
          control={control}
          lotsExpiredAtList={lotsExpiredAtList}
        />
      ) : null}
      {lotTransactionType === 'sell' && lotTypeOperation === 'create' ? (
        <CreateLotSelectStartingPrice error={errors.price} control={control} />
      ) : null}
      <BaseFlex
        justifyContent={JustifyContent.SPACE_BETWEEN}
        flexDirection={FlexDirection.ROW}
        className={styles.stepsAction}
      >
      
        {lotTypeOperation === 'create' ? <BaseButton
          type="link"
          className={styles.btnPrev}
          value={t<string>('auctions.create.navigation.prevStep')}
          onClick={prev}
        /> : <BaseButton
        type="link"
        className={styles.btnPrev}
        value={ t<string>('auctions.create.navigation.cancel')
        }
        onClick={back}
      />}
        <BaseButton
          className={styles.btnNext}
          type="primary"
          value={
            lotTypeOperation === 'create'
              ? t<string>('auctions.create.navigation.nextStep')
              : t<string>('auctions.create.navigation.placeBet')
          }
        />
      </BaseFlex>
    </BaseFlex>
  );
};

export default React.memo(CreateEditLotStep2);
