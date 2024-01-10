import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Radio } from 'antd';
import { Controller, Control, FieldError } from 'react-hook-form';
import { IProps } from 'interfaces/props';
import { FlexDirection } from 'interfaces/flex';
import { ICreateLot } from 'interfaces/auctions';
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

const CreateLotServiceType: React.FC<Props> = ({ control, data, error, header }) => {
  const [t] = useTranslation('common');

  return (
    <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.section}>
      <BaseTypography weight="bold" size="lg" value={header} className={styles.header} />
      <BaseFlex>
        <BaseTypography
          weight="medium"
          value={t<string>('customCurrentProducts.step1.type')}
          className={styles.label}
        />
      </BaseFlex>
      <Controller
        render={({ field }) => (
          <Radio.Group aria-label="is_purchase" className={styles.deliveryConditionsWrp} {...field}>
            <div className={classNames(styles.item)}>
              <BaseRadioButton
                value={true}
                label={
                  <BaseFlex flexDirection={FlexDirection.ROW}>
                    <BaseTypography weight="extra-bold" value={t<string>('customCurrentProducts.step1.typeLotBuy')} />
                    <BaseTypography
                      color="main"
                      value={` (${t<string>('customCurrentProducts.step1.currentDemand')})`}
                    />
                  </BaseFlex>
                }
                className={styles.radioBtnHeader}
              />
            </div>
            <div className={classNames(styles.item)}>
              <BaseRadioButton
                value={false}
                label={
                  <BaseFlex flexDirection={FlexDirection.ROW}>
                    <BaseTypography weight="extra-bold" value={t<string>('customCurrentProducts.step1.typeLotSell')} />
                    <BaseTypography color="main" value={`(${t<string>('customCurrentProducts.step1.currentOffer')})`} />
                  </BaseFlex>
                }
                className={styles.radioBtnHeader}
              />
            </div>
          </Radio.Group>
        )}
        name={'is_purchase'}
        control={control}
        defaultValue={data.delivery_method}
      />
      {error && <ErrorMessage value={error.message} />}
    </BaseFlex>
  );
};

export default React.memo(CreateLotServiceType);
