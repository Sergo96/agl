import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { IProps } from 'interfaces/props';
import { Select } from 'antd';
import { IOption } from 'interfaces/options';
import styles from './index.module.scss';

export interface IBaseSelectProps extends IProps {
  placeholder?: string;
  value?: string | number;
  options?: IOption[];
  size?: string;
  bordered?: boolean;
  suffixIcon?: React.ReactElement;
  defaultValue?: string;
  showSearch?: boolean;
  defaultActiveFirstOption?: boolean;
  filterOption?: boolean;
  notFoundContent?: ReactNode | null;
  mode?: 'multiple' | 'tags';
  showArrow?: boolean;
  onSearch?: (value: string) => void;
  onChange: (value: string | number, option?: any) => void;
}

interface Props extends IBaseSelectProps {}

const BaseSelect: React.FC<Props> = ({
  placeholder,
  value,
  size,
  className,
  bordered,
  suffixIcon,
  defaultValue,
  options,
  ...props
}) => {
  const _value = value === '' ? undefined : value;
  return (
    <Select
      placeholder={placeholder}
      defaultValue={defaultValue}
      suffixIcon={suffixIcon}
      bordered={bordered}
      value={_value}
      size="large"
      className={classNames(styles.baseSelect, className)}
      options={options}
      {...props}
    />
  );
};

export default BaseSelect;
