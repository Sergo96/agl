import React from 'react';
import BaseTypography from 'atoms/Typography';
import BaseInputArea from 'atoms/InputArea';
import { IProps } from 'interfaces/props';
import labelInputstyles from '../LabelInput/index.module.scss';

interface Props extends IProps {
  type?: 'secondary' | 'success' | 'warning' | 'danger';
  placeholder?: string;
  label?: string;
  classNameInput?: string;
  name?: string;
}

const LabelInputArea: React.FC<Props> = ({ className, classNameInput, label = 'Логин', ...props }) => {
  return (
    <div className={className}>
      <BaseTypography className={labelInputstyles.formFieldLabel} value={label} />
      <div {...props}>
        <BaseInputArea className={classNameInput} {...props} />
      </div>
    </div>
  );
};

export default LabelInputArea;
