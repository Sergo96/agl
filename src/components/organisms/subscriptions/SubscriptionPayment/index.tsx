import React, { useState } from 'react';
import BaseButton from 'atoms/Button';
import { useTranslation } from 'react-i18next';
import BaseTypography from 'atoms/Typography';
import BaseFlex from 'atoms/Flex';
import { AlignContent, AlignSelf, FlexDirection, JustifyContent } from 'interfaces/flex';
import styles from './index.module.scss';
import classNames from 'classnames';
import { IProps } from 'interfaces/props';

interface Props extends IProps {
  previousStep: () => void;
  nextStep: () => void;
}
const SubscriptionPayment: React.FC<Props> = ({ previousStep, nextStep }) => {
  const [isCreditCardPayment, setIsCreditCardPayment] = useState(false);

  const [t] = useTranslation('common');

  const cardPaymentStyle = classNames(styles.payment, isCreditCardPayment && styles.paymentSelected);
  const chechPaymentStyle = classNames(styles.payment, !isCreditCardPayment && styles.paymentSelected);

  const cardPaymentButton = !isCreditCardPayment ? (
    <BaseTypography value={t<string>('subscriptions.payment.selected')} />
  ) : (
    <BaseButton
      className={styles.choiceButton}
      type="primary"
      value={t<string>('subscriptions.payment.select')}
      onClick={() => setIsCreditCardPayment(false)}
    />
  );
  const chechPaymentButton = isCreditCardPayment ? (
    <BaseTypography value={t<string>('subscriptions.payment.selected')} />
  ) : (
    <BaseButton
      className={styles.choiceButton}
      type="primary"
      value={t<string>('subscriptions.payment.select')}
      onClick={() => setIsCreditCardPayment(true)}
    />
  );
  const finalizePayment = () => {
    if (isCreditCardPayment) {
      nextStep();
    }
  };

  return (
    <BaseFlex className={styles.root} alignSelf={AlignSelf.CENTER} flexDirection={FlexDirection.COLUMN}>
      <BaseTypography
        className={styles.title}
        weight="semi-bold"
        size="xxl"
        value={t<string>('subscriptions.payment.title')}
      />
      <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN}>
        <BaseFlex className={cardPaymentStyle} alignContent={AlignContent.SPACE_BETWEEN}>
          <BaseTypography
            className={styles.subtitle}
            color="primary"
            weight="semi-bold"
            size="lg"
            value={t<string>('subscriptions.payment.online')}
          />
          <BaseTypography
            className={styles.description}
            size="md"
            value={t<string>('subscriptions.payment.onlineDescription')}
          />
          {cardPaymentButton}
        </BaseFlex>
        <BaseFlex className={chechPaymentStyle} alignContent={AlignContent.SPACE_BETWEEN}>
          <BaseTypography
            className={styles.subtitle}
            color="primary"
            weight="semi-bold"
            size="lg"
            value={t<string>('subscriptions.payment.cashless')}
          />
          <BaseTypography
            className={styles.description}
            size="md"
            value={t<string>('subscriptions.payment.cashlessDescription')}
          />
          {chechPaymentButton}
        </BaseFlex>
      </BaseFlex>
      <BaseFlex className={styles.buttons} justifyContent={JustifyContent.END}>
        <BaseButton
          onClick={previousStep}
          className={styles.button}
          type="ghost"
          value={t<string>('subscriptions.payment.cancel')}
        />
        <BaseButton
          onClick={finalizePayment}
          className={styles.button}
          type="primary"
          value={t<string>('subscriptions.payment.proceed')}
        />
      </BaseFlex>
    </BaseFlex>
  );
};
export default SubscriptionPayment;
