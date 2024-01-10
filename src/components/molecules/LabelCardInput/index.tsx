import React from 'react';
import { IBaseAtomComponentProps } from 'interfaces/props';
import BaseTypography from 'atoms/Typography';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import styles from './index.module.scss';
import labelInputStyles from '../LabelInput/index.module.scss';

interface Props extends IBaseAtomComponentProps {
  options: StripeCardElementOptions;
  label: string;
  name: string;
}

const LabelCardInput: React.FC<Props> = ({ options, className, label, ...props }) => {
  return (
    <div className={className}>
      <BaseTypography className={labelInputStyles.formFieldLabel} value={label} />
      <div className={styles.card} {...props}>
        <CardElement options={options} {...props} />
      </div>
    </div>
  );
};

export default LabelCardInput;
