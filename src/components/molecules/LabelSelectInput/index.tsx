import React from 'react';
import BaseSelect, { IBaseSelectProps } from 'atoms/Select';
import BaseTypography from 'atoms/Typography';
import classNames from 'classnames';
import labelInputStyles from '../LabelInput/index.module.scss';

interface Props extends IBaseSelectProps {
  label: string;
  classNameLabel?: string;
  classNameSelect?: string;
}

const LabelSelectInput: React.FC<Props> = ({ className, label, classNameLabel, classNameSelect, ...props }) => {
  return (
    <div className={classNames(labelInputStyles.wrapper, className)}>
      <BaseTypography className={classNames(labelInputStyles.formFieldLabel, classNameLabel)} value={label} />
      <div className={labelInputStyles.formItem}>
        <BaseSelect size="large" className={classNameSelect} {...props} />
      </div>
    </div>
  );
};
export default LabelSelectInput;
