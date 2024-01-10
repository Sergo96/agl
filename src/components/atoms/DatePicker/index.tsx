import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { DatePicker } from 'antd';
import Calendar from 'icons/Calendar';
import { IProps } from 'interfaces/props';
import { Moment } from 'moment';
import styles from './index.module.scss';

export interface IDatePickerProps extends IProps {
  value: number;
  onChange: (val: number | null) => void;
  placeholder?: string;
  format?: string;
}

const BaseDatePicker: React.FC<IDatePickerProps> = ({
  className,
  value,
  onChange,
  placeholder,
  ...props
}) => {
  const _value = moment.unix(value);

  const onChangeEvent = (val: Moment | null) => {
    if (val) {
      onChange(val.unix());
    } else {
      onChange(null);
    }
  };
  return (
    <DatePicker
      placeholder={placeholder}
      className={classNames(styles.datePicker, className)}
      suffixIcon={<Calendar />}
      value={_value}
      onChange={onChangeEvent}
      format="DD-MM-YYYY"
      {...props}
    />
  );
};

export default BaseDatePicker;
