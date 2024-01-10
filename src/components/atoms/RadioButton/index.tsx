import React from 'react';
import styles from './index.module.scss';
import { Radio } from 'antd';
import classNames from 'classnames';
import { IProps } from 'interfaces/props';

export interface ICheckboxProps extends IProps {
  value: string | number| boolean| React.ReactElement;
  label: string | React.ReactElement;
  className?: string;
}

const BaseRadioButton: React.FC<ICheckboxProps> = ({ label, value, className, ...props }) => {
  return (
    <Radio className={classNames(styles.baseRadioButton, className)} value={value} {...props}>
      {label && label}
    </Radio>
  );
};

export default BaseRadioButton;
