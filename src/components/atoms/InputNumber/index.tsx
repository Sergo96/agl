import { InputNumber } from 'antd';
import { ReactText } from 'react';
import classNames from 'classnames';
import { IProps } from 'interfaces/props';
import styles from './index.module.scss';

interface Props extends IProps {
  placeholder?: string;
  value?: number;
  onChange?: (e: ReactText) => void;
  min?: number;
  max?: number;
}

const BaseInputNumber: React.FC<Props> = ({ className, ...props }) => {
  return <InputNumber className={classNames(styles.baseInput, className)} {...props} />;
};

export default BaseInputNumber;
