import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { connect, ConnectedProps } from 'react-redux';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import BaseButton from 'atoms/Button';
import BaseTypography from 'atoms/Typography';
import ErrorMessage from 'atoms/ErrorMessage';
import LabelInput from 'molecules/LabelInput';
import { IRecoverPassword } from 'interfaces/auth';
import { recoverPassword } from 'actions/auth';
import { mailHasBeenSentSelector } from 'selectors/auth';
import { IAysAgroState } from 'store';
import styles from './index.module.scss';

const mapStateToProps = (state: IAysAgroState) => {
  return {
    mailHasBeenSent: mailHasBeenSentSelector(state),
  };
};

const mapDispatchToProps = {
  submitData: (data: IRecoverPassword) => recoverPassword(data),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

const RecoverPasswordForm: React.FC<Props> = ({ submitData, mailHasBeenSent }: Props) => {
  const [t] = useTranslation('common');
  const validationSchema = Yup.object().shape({
    email: Yup.string().required(t('auth.validation.enterEmail')).email(t('auth.validation.enterValidEmail')),
  });
  const router = useRouter();

  const defaultValues: IRecoverPassword = {
    email: '',
  };
  const [data, setData] = useState(defaultValues);

  useEffect(() => {
    if (data.email) {
      submitData(data);
      onReset();
    }
  }, [data]);

  useEffect(() => {
    if (mailHasBeenSent) {
      router.push('/recover-password-step-2');
    }
  }, [mailHasBeenSent]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IRecoverPassword>({ defaultValues, resolver: yupResolver(validationSchema) });

  const onReset = () => {
    reset({
      email: '',
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.shadowTitle}>
        <BaseTypography value={t<string>('auth.passwordRecovery')} />
      </div>
      <form onSubmit={handleSubmit((data) => setData(data))} className={styles.form}>
        <div className={classNames(styles.wrapper)}>
          <div className={styles.formField}>
            <Controller
              name="email"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <LabelInput
                  className={styles.formField}
                  classNameInput={errors.email && styles.errorFormField}
                  label="Email"
                  placeholder={t<string>('auth.enterEmail')}
                  {...rest}
                />
              )}
            />
            {errors.email && <ErrorMessage value={errors.email.message} />}
          </div>
        </div>
        <div className={classNames(styles.formField, styles.textField)}>
          <BaseTypography value={t<string>('auth.passwordRecoverySubtitle')} />
        </div>

        <div className={classNames(styles.formField)}>
          <BaseButton type="primary" value={t<string>('auth.passwordRecoveryBtn')} className={styles.btnWide} />
        </div>
      </form>
    </div>
  );
};

export default connector(RecoverPasswordForm);
