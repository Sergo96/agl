import React from 'react';
import BaseTypography from 'atoms/Typography';
import { IProps } from 'interfaces/props';
import classNames from 'classnames';
import BasePasswordInput from 'atoms/PasswordInput';
import { useTranslation } from 'react-i18next';
import labelInputStyles from '../LabelInput/index.module.scss';

interface Props extends IProps {
  type?: 'secondary' | 'success' | 'warning' | 'danger';
  placeholder?: string;
  label?: string;
  classNameInput?: string;
  name?: string;
}

const LabelPasswordInput: React.FC<Props> = ({ className, classNameInput, placeholder, label, ...props }) => {
  const [t] = useTranslation('common');

  return (
    <div className={classNames(labelInputStyles.wrapper, className)}>
      <BaseTypography className={labelInputStyles.formFieldLabel} value={label} />
      <div className={labelInputStyles.formItem}>
        <BasePasswordInput
          placeholder={t<string>('auth.enterPassword')}
          label={t<string>('auth.password')}
          {...props}
        />
      </div>
    </div>
  );
};

export default LabelPasswordInput;
