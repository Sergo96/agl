import React, { useMemo } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import BaseButton from 'atoms/Button';
import BaseFlex from 'atoms/Flex';
import { FlexDirection, JustifyContent } from 'interfaces/flex';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import LabelCardInput from 'molecules/LabelCardInput';
import styles from './index.module.scss';
import { IProps } from 'interfaces/props';
import { IPostPaymentMethod } from 'interfaces/subscriptions';

const useOptions = () => {
  const options = useMemo(
    () => ({
      hidePostalCode: true,
      style: {
        base: {
          lineHeight: '40px',
          fontSize: '16px',
          fontFamily: 'Roboto, sans-serif',
          weight: '400',
          '::placeholder': {
            color: '#8da0ad',
          },
          backgroundColor: 'white',
        },
        invalid: {
          color: '#9e2146',
        },
      },
    }),
    []
  );

  return options;
};

interface Props extends IProps {
  tariffId: number;
  previousStep: () => void;
  buySubscription: (stripeToken: IPostPaymentMethod, notification: string) => Promise<void>;
}

const CardForm: React.FC<Props> = ({ previousStep, tariffId, buySubscription }) => {
  const [t] = useTranslation('common');

  const options = useOptions();
  const stripe = useStripe();
  const elements = useElements();

  const { control, handleSubmit } = useForm();

  const onSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const payload = await stripe.createToken(cardElement!);
    const data = {
      stripeToken: payload,
      tariffId: tariffId,
    };
    buySubscription(data, t('subscriptions.card.card.notification'));
  };

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN}>
          <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
            <Controller
              name="card"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <LabelCardInput label={t('subscriptions.card.card.label')} options={options} {...rest} />
              )}
            />
          </BaseFlex>
          <BaseFlex className={styles.buttons} justifyContent={JustifyContent.SPACE_BETWEEN}>
            <BaseButton
              htmlType="button"
              onClick={previousStep}
              className={styles.button}
              type="ghost"
              value={t<string>('subscriptions.payment.cancel')}
            />
            <BaseButton className={styles.button} type="primary" value={t<string>('subscriptions.payment.proceed')} />
          </BaseFlex>
        </BaseFlex>
      </form>
    </div>
  );
};

export default CardForm;
