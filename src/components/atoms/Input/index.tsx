import { Input } from 'antd';
import { ChangeEvent } from 'react';
import classNames from 'classnames';
import { IProps } from 'interfaces/props';
import styles from './index.module.scss';

interface Props extends IProps {
  placeholder?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const BaseInput: React.FC<Props> = ({ placeholder, className, type = 'text', ...props }) => {
  return <Input type={type} placeholder={placeholder} className={classNames(styles.baseInput, className)} {...props} />;
};

export default BaseInput;
