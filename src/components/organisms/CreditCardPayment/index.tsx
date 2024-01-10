import React from 'react';
import CardForm from 'molecules/CardForm';
import { IProps } from 'interfaces/props';
import { IPostPaymentMethod } from 'interfaces/subscriptions';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

interface Props extends IProps {
  previousStep: () => void;
  tariffId: number;
  buySubscription: (data: IPostPaymentMethod, notification: string) => Promise<void>;
}

const CreditCardPayment: React.FC<Props> = ({ previousStep, tariffId, buySubscription }) => {
  const publishableKey =
    'pk_test_51JL4vDJICu4ismnKwzIr069aZ3uCvSNAgALq6k21vK8pMc6oG0YRYV1veB0U99bsgjxX2EzDKVro0s5PjjDlfo2c00axlMEHWn';

  const stripePromise = loadStripe(publishableKey);

  return (
    <Elements stripe={stripePromise}>
      <CardForm previousStep={previousStep} tariffId={tariffId} buySubscription={buySubscription} />
    </Elements>
  );
};
export default CreditCardPayment;
