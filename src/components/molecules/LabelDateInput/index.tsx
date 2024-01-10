import React from 'react';
import classNames from 'classnames';
import { Moment } from 'moment';
import BaseTypography from 'atoms/Typography';
import BaseDatePicker, { IDatePickerProps } from 'atoms/DatePicker';
import labelInputStyles from '../LabelInput/index.module.scss';

interface Props extends IDatePickerProps {
  type?: 'secondary' | 'success' | 'warning' | 'danger';
  label?: string;
  classNameLabel?: string;
  classNameInput?: string;
  disabledDate?: (value: Moment) => void;
  dateRender?: (value: Moment) => void;
}

const LabelDateInput: React.FC<Props> = ({ className, label, classNameLabel, classNameInput, ...props }) => {
  
  return (
    <div className={classNames(labelInputStyles.wrapper, className)}>
      <BaseTypography className={classNames(labelInputStyles.formFieldLabel, classNameLabel)} value={label} />
      <div className={labelInputStyles.formItem}>
        <BaseDatePicker className={classNameInput} {...props} />
      </div>
    </div>
  );
};

export default LabelDateInput;
