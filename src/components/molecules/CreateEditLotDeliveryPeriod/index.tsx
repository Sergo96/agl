import React from 'react';
import { useTranslation } from 'react-i18next';
import moment, { Moment } from 'moment';
import classNames from 'classnames';
import { Radio } from 'antd';
import { Controller, Control, FieldError } from 'react-hook-form';
import { IProps } from 'interfaces/props';
import { FlexDirection } from 'interfaces/flex';
import { ICreateLot } from 'interfaces/auctions';
import LabelDateInput from 'molecules/LabelDateInput';
import LabelInput from 'molecules/LabelInput';
import BaseRadioButton from 'atoms/RadioButton';
import BaseTypography from 'atoms/Typography';
import BaseFlex from 'atoms/Flex';
import ErrorMessage from 'atoms/ErrorMessage';
import styles from './index.module.scss';

interface Props extends IProps {
  control: Control<ICreateLot>;
  data: ICreateLot;
  watchDeliveryMethod?: number;
  error: FieldError | undefined;
  header: string;
}

const CreateEditLotDeliveryPeriod: React.FC<Props> = ({ control, data, watchDeliveryMethod, error, header, }) => {
  const [t] = useTranslation('common');

  function disabledDateFrom(current: Moment) {
    return current < moment().endOf('day');
  }

  function disabledDateTo(current: Moment) {
    return current < moment().endOf('day');
  }

  return (
    <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.section}>
      <BaseTypography weight="bold" size="lg" value={header} />
      <BaseFlex className={styles.wrp}>
        <Controller
          name="delivery_from"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <LabelDateInput label={t('auctions.deliveryTimeFrom')} classNameLabel={styles.label} className={styles.item} disabledDate={disabledDateFrom} {...rest} />
          )}
        />
        <Controller
          name="delivery_to"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <LabelDateInput label={t('auctions.deliveryTimeTo')} classNameLabel={styles.label}  disabledDate={disabledDateTo} className={styles.item} {...rest} />
          )}
        />
      </BaseFlex>

      <BaseFlex>
        <BaseTypography
          weight="medium"
          value={t<string>('auctions.create.step2.deliveryConditionsLabel')}
          className={styles.label}
        />
      </BaseFlex>
      <Controller
        render={({ field }) => (
          <Radio.Group aria-label="delivery_method" className={styles.deliveryConditionsWrp} {...field}>
            <div className={classNames(styles.item)}>
              <BaseRadioButton
                value={1}
                label={`${t('auctions.create.step2.deliveriMethodFCA')} (${t('auctions.create.step2.deliveriMethodFCAPS')})`}
                className={styles.radioBtnHeader}
              />
            </div>
            <div className={classNames(styles.item)}>
              <BaseRadioButton
                value={2}
                label={`${t('auctions.create.step2.deliveriMethodDAP')} (${t('auctions.create.step2.deliveriMethodDAPPS')})`}
                className={styles.radioBtnHeader}
              />
            </div>
          </Radio.Group>
        )}
        name={'delivery_method'}
        control={control}
        defaultValue={data.delivery_method}
      />
      {watchDeliveryMethod === 2 ? (
        <>
        <Controller
          render={({ field: { ref, ...rest } }) => (
            <LabelInput
              className={styles.deliveryFormInput}
              label={t('auctions.create.step2.deliveryAddress')}
              type="secondary"
              {...rest}
            />
          )}
          name={'address'}
          control={control}
          />
          {error && <ErrorMessage value={error.message} />}
          </>
      ) : null}
    </BaseFlex>
  );
};

export default React.memo(CreateEditLotDeliveryPeriod);
