import React from 'react';
import classNames from 'classnames';
import BaseInput from 'atoms/Input';
import BaseTypography from 'atoms/Typography';
import BaseButton from 'atoms/Button';
import { IBaseAtomComponentProps } from 'interfaces/props';
import styles from './index.module.scss';

interface Props extends IBaseAtomComponentProps {
  type?: string;
  placeholder: string;
  label: string;
  secondLabel: string;
  classNameInput?: string;
  name: string;
  onClickSecondLabel: (e: React.MouseEvent<HTMLElement>) => void;
}

const TwoLabelsInput: React.FC<Props> = ({
  className,
  classNameInput,
  label = 'Логин',
  secondLabel,
  onClickSecondLabel,
  ...props
}) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.formField}>
        <div className={styles.formFieldbox}>
          <BaseTypography className={styles.formFieldLabel} value={label} />
          <BaseButton onClick={onClickSecondLabel} className={styles.button} htmlType="button" value={secondLabel} />
        </div>

        <div className={styles.formItem} {...props}>
          <BaseInput className={classNames(styles.formFieldInput, classNameInput)} {...props} />
        </div>
      </div>
    </div>
  );
};

export default TwoLabelsInput;
