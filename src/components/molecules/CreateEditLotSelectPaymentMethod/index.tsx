import React from 'react';
import classNames from 'classnames';
import moment, { Moment } from 'moment';
import { Controller, Control, FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Radio } from 'antd';
import { IProps } from 'interfaces/props';
import { FlexDirection } from 'interfaces/flex';
import { ICreateLot } from 'interfaces/auctions';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import BaseRadioButton from 'atoms/RadioButton';
import LabelInputArea from 'molecules/LabelInputArea';
import LabelDateInput from 'molecules/LabelDateInput';
import LabelInputNumber from 'molecules/LabelInputNumber';
import ErrorMessage from 'atoms/ErrorMessage';
import styles from './index.module.scss';

interface Props extends IProps {
  control: Control<ICreateLot>;
  data: ICreateLot;
  watchPaymentMethod?: number;
  error: FieldError | undefined;
  header: string;
}

const CreateEditLotSelectPaymentMethod: React.FC<Props> = ({ control, watchPaymentMethod, data, error, header }) => {
  const [t] = useTranslation('common');

  function disabledDate(current: Moment) {
    return current < moment().endOf('day');
  }

  return (
    <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.section}>
      <BaseTypography className={styles.header} weight="bold" size="lg" value={header} />
      <Controller
        render={({ field }) => (
          <Radio.Group aria-label="payment method" className={styles.grid} {...field}>
            <div className={classNames(styles.itemBorder, watchPaymentMethod === 1 && styles.selectedType)}>
              <BaseRadioButton
                value={1}
                label={t('auctions.create.step2.prePayment')}
                className={styles.radioBtnHeader}
              />
              <BaseTypography
                className={styles.description}
                size="sm"
                weight="regular"
                value={t<string>('auctions.create.step2.prePaymentTitle')}
              />
            </div>
            <div className={classNames(styles.itemBorder, watchPaymentMethod === 2 && styles.selectedType)}>
              <BaseRadioButton
                value={2}
                label={t('auctions.create.step2.defferal')}
                className={styles.radioBtnHeader}
              />
              <BaseTypography
                className={styles.description}
                weight="regular"
                size="sm"
                value={t<string>('auctions.create.step2.defferalTitle')}
              />
            </div>
          </Radio.Group>
        )}
        name={'payment_method'}
        control={control}
        defaultValue={data.payment_method}
      />

      <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.formFieldDate}>
        {watchPaymentMethod === 1 && (
          <Controller
            render={({ field: { ref, ...rest } }) => (
              <LabelInputNumber
                min={10}
                max={100}
                label={t('auctions.create.step2.prePaymentPercent')}
                classNameLabel={styles.label}
                className={styles.itemDate}
                classNameInput={styles.input}
                {...rest}
              />
            )}
            defaultValue={data.prepayment_percent}
            name={'prepayment_percent'}
            control={control}
          />
        )}
        {error && <ErrorMessage value={error.message} />}
        {watchPaymentMethod === 2 && (
          <BaseFlex className={styles.gracePeriod}>
            <Controller
              name={'grace_period_to'}
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <LabelDateInput
                  label={t('auctions.create.step2.defferalDate')}
                  classNameLabel={styles.label}
                  className={styles.itemDate}
                  classNameInput={styles.inputGracePeriod}
                  disabledDate={disabledDate}
                  {...rest}
                />
              )}
            />
            <BaseTypography
              className={styles.inputGracePeriodSubtitle}
              color="secondary"
              size="xs"
              value={t<string>('auctions.create.step2.to')}
            />
          </BaseFlex>
        )}
      </BaseFlex>

      <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.formFieldLarge}>
        <Controller
          render={({ field: { ref, ...rest } }) => (
            <LabelInputArea
              classNameInput={styles.formInputAreaField}
              label={t('auctions.create.step2.commentLabel')}
              placeholder=""
              type="secondary"
              {...rest}
            />
          )}
          name={'comment'}
          control={control}
        />
      </BaseFlex>
    </BaseFlex>
  );
};

export default React.memo(CreateEditLotSelectPaymentMethod);
