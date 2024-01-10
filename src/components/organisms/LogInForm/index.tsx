import * as Yup from 'yup';
import classNames from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { ILoginData } from 'interfaces/auth';
import { IAysAgroState } from 'store';
import { useUserIsLogin } from 'hooks/userIsLoggedIn';
import { logIn } from 'actions/auth';
import BaseTypography from 'atoms/Typography';
import ErrorMessage from 'atoms/ErrorMessage';
import BaseButton from 'atoms/Button';
import LabelInput from 'molecules/LabelInput';
import LabelPasswordInput from 'molecules/LabelPasswordInput';
import RemindField from 'molecules/RemindField';
import styles from './index.module.scss';

const mapDispatchToProps = {
  submitData: (data: ILoginData) => logIn(data),
};

const mapStateToProps = (state: IAysAgroState) => {
  return {
    isLoginError: state.auth.isError,
    userLogIn: state.auth.userLogIn,
  };
};
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {}

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Login is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LogInForm: React.FC<Props> = ({ submitData, isLoginError, userLogIn }: Props) => {
  useUserIsLogin(userLogIn);
  const [t] = useTranslation('common');
  const defaultValues: ILoginData = {
    username: '',
    password: '',
  };
  const [data, setData] = useState<ILoginData>(defaultValues);

  useEffect(() => {
    if (data.username && data.password) {
      submitData(data);
    }
  }, [data]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginData>({ defaultValues, resolver: yupResolver(validationSchema) });

  if (userLogIn) return null;
  return (
    <div className={styles.root}>
      <div className={styles.shadowTitle}>
        <BaseTypography value={t<string>('auth.title')} />
      </div>

      <form onSubmit={handleSubmit((data) => setData(data))} className={styles.form}>
        <Controller
          name="username"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <LabelInput
              label={t('auth.login')}
              className={styles.formField}
              classNameInput={errors.username && styles.errorFormField}
              placeholder={t<string>('auth.enterLogin')}
              {...rest}
            />
          )}
        />
        {errors.username && <ErrorMessage value={errors.username.message} />}
        {isLoginError && <ErrorMessage value={t<string>('auth.loginErrorMessage')} />}

        <Controller
          name="password"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <LabelPasswordInput
              className={styles.formField}
              classNameInput={errors.password && styles.errorFormFiel}
              {...rest}
            />
          )}
        />
        {errors.password && <ErrorMessage value={errors.password?.message} />}
        {isLoginError && <ErrorMessage value={t<string>('auth.loginErrorMessage')} />}
        <RemindField className={styles.remindField} value={t<string>('auth.rememberMe')} />
        <div className={classNames(styles.buttonField)}>
          <BaseButton type="primary" value={t<string>('auth.enter')} className={styles.btnWide} />
        </div>
      </form>
    </div>
  );
};

export default connector(LogInForm);
