import React from 'react';
import { Controller, FieldError, DeepMap } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Radio } from 'antd';
import BaseRadioButton from 'atoms/RadioButton';
import { IProps } from 'interfaces/props';
import { Control, FieldValues } from 'react-hook-form/dist/types';
import { IRegistrationDataStep1 } from 'interfaces/auth';

interface Props extends IProps {
  control: Control<IRegistrationDataStep1>;
  errors: DeepMap<FieldValues, FieldError>;
}

const UserTradeTypeRegistrationField: React.FC<Props> = ({ control }) => {
  const [t] = useTranslation('common');
  return (
    <Controller
      name="company.trade_type"
      control={control}
      render={({ field: { ref, ...rest } }) => (
        <Radio.Group {...rest}>
          <BaseRadioButton value="seller" label={t('registration.step1.tradeType.seller')} />
          <BaseRadioButton value="buyer" label={t('registration.step1.tradeType.buyer')} />
          <BaseRadioButton value="seller_and_buyer" label={t('registration.step1.tradeType.both')} />
        </Radio.Group>
      )}
    />
  );
};

export default UserTradeTypeRegistrationField;
