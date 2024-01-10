import { IBaseAtomComponentProps } from 'interfaces/props';
import BaseTypography from 'atoms/Typography';
import React, { ChangeEvent } from 'react';
import BaseInput from 'atoms/Input';
import styles from './index.module.scss';

interface Props extends IBaseAtomComponentProps {
  type?: 'secondary' | 'success' | 'warning' | 'danger' | undefined;
  placeholder?: string;
  label?: string;
  classNameInput?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabelInput: React.FC<Props> = ({ className, classNameInput, label = 'Логин', ...props }) => {
  return (
    <div className={className}>
      <div>
        <BaseTypography className={styles.formFieldLabel} value={label} />
        <div {...props}>
          <BaseInput className={classNameInput} {...props} />
        </div>
      </div>
    </div>
  );
};

export default LabelInput;
