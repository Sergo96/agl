import styles from './index.module.scss';
import { IProps } from 'interfaces/props';
import BaseTypography from 'atoms/Typography';
import React from 'react';
import classNames from 'classnames';
import BaseInputNumber from 'atoms/InputNumber';

interface Props extends IProps {
  label?: string;
  classNameInput?: string;
  name?: string;
  classNameLabel?: string;
  min?: number;
  max?: number;
}

const LabelInputNumber: React.FC<Props> = ({ className, classNameInput, classNameLabel, label, ...props }) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.formField}>
        <BaseTypography className={classNames(styles.formFieldLabel, classNameLabel)} value={label} />
        <div className={styles.formItem} {...props}>
          <BaseInputNumber className={classNames(styles.formFieldInput, classNameInput)} {...props} />
        </div>
      </div>
    </div>
  );
};

export default LabelInputNumber;
