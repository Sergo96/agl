import { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import ErrorMessage from 'atoms/ErrorMessage';
import BaseButton from 'atoms/Button';
import BaseTypography from 'atoms/Typography';
import LabelPasswordInput from 'molecules/LabelPasswordInput';
import { createNewPassword } from 'actions/auth';
import { INewPassword } from 'interfaces/auth';
import { passwordValidationRegex } from 'utils/validation/regex';
import styles from './index.module.scss';

const mapDispatchToProps = {
  submitData: (data: INewPassword) => createNewPassword(data),
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

const NewPasswordForm: React.FC<Props> = ({ submitData }: Props) => {
  const [t] = useTranslation('common');
  const validationSchema = Yup.object().shape({
    new_password1: Yup.string()
      .matches(passwordValidationRegex, t('auth.validation.passwordValidationMessage'))
      .required(t('auth.validation.passwordMatch')),
    new_password2: Yup.string().oneOf([Yup.ref('new_password1'), null], t('auth.validation.passwordMatch')),
  });
  const defaultValues: INewPassword = {
    new_password1: '',
    new_password2: '',
  };
  const [data, setData] = useState(defaultValues);

  useEffect(() => {
    if (data.new_password1 && data.new_password2) {
      submitData(data);
    }
  }, [data]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<INewPassword>({ defaultValues, resolver: yupResolver(validationSchema) });

  return (
    <div className={styles.root}>
      <div className={styles.shadowTitle}>
        <BaseTypography value={t<string>('auth.newPassword')} />
      </div>
      <form onSubmit={handleSubmit((data) => setData(data))} className={styles.form}>
        <Controller
          name="new_password1"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <LabelPasswordInput
              className={styles.formField}
              placeholder={t<string>('auth.enterPassword')}
              label={t<string>('auth.password')}
              {...rest}
            />
          )}
        />
        {errors.new_password1 && <ErrorMessage value={errors.new_password1.message} />}
        <Controller
          name="new_password2"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <LabelPasswordInput
              className={styles.formField}
              label={t<string>('auth.repeatPassword')}
              placeholder={t<string>('auth.repeatPassword')}
              {...rest}
            />
          )}
        />
        {errors.new_password2 && <ErrorMessage value={errors.new_password2?.message} />}

        <div className={classNames(styles.formField, styles.textField)}>
          <BaseTypography value={t<string>('auth.validation.passwordValidationTitle')} />
        </div>
        <div className={classNames(styles.formField)}>
          <BaseButton type="primary" value={t<string>('auth.save')} className={styles.btnWide} />
        </div>
      </form>
    </div>
  );
};

export default connector(NewPasswordForm);
