import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AlertCircled from 'icons/AlertCircled';
import BaseTypography from 'atoms/Typography';
import BaseFlex from 'atoms/Flex';
import BaseButton from 'atoms/Button';
import ErrorMessage from 'atoms/ErrorMessage';
import LabelInput from 'molecules/LabelInput';
import LabelPasswordInput from 'molecules/LabelPasswordInput';
import { FlexDirection, JustifyContent } from 'interfaces/flex';
import { connect, ConnectedProps } from 'react-redux';
import { IPostUsername } from 'interfaces/profile';
import { loadingUsername, updateUsername } from 'actions/profile';
import { profileUsername } from 'selectors/profile';
import { IAysAgroState } from 'store';
import styles from './index.module.scss';
import buttonStyles from '../ProfileCompanyInfo/index.module.scss';

const mapStateToProps = (state: IAysAgroState) => ({
  username: profileUsername(state),
});

const mapDispatchToProps = {
  updateCompanyProfileData: (data: IPostUsername, notification: string) => updateUsername(data, notification),
  loadUsername: () => loadingUsername(),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {}

const ProfileLoginInfo: React.FC<Props> = ({ username, updateCompanyProfileData, loadUsername }) => {
  const [t] = useTranslation('common');

  useEffect(() => {
    loadUsername();
  }, []);

  useEffect(() => {
    reset(username);
  }, [username.username]);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t('auth.validation.required')),
    password: Yup.string()
      .min(6, t('auth.validation.passwordValidationMinCharactersMessage'))
      .required(t('auth.validation.required')),
    password_confirm: Yup.string().oneOf([Yup.ref('password'), null], t('auth.validation.passwordMatch')),
  });

  const defaultValues: IPostUsername = {
    ...username,
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<IPostUsername>({ defaultValues, resolver: yupResolver(validationSchema) });

  const clearPassword = () => {
    setValue('password', '');
    setValue('password_confirm', '');
  };

  const onSubmit = (data: IPostUsername) => {
    updateCompanyProfileData(data, t<string>('notifications.profileUpdateSuccess'));
    clearPassword();
  };

  return (
    <>
      <form id="hook-form-username" className={styles.root} onSubmit={handleSubmit(onSubmit)}>
        <BaseFlex className={styles.formFieldLarge} flexDirection={FlexDirection.COLUMN}>
          <Controller
            name="username"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <LabelInput label={t('auth.login')} placeholder={t<string>('auth.enterLogin')} {...rest} />
            )}
          />
          {errors.username && <ErrorMessage value={errors.username.message} />}
        </BaseFlex>

        <BaseTypography
          className={styles.loginInfoText}
          value={t<string>('profile.loginAndPassword.passwordValidationDescription')}
        />
        <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN} className={styles.formPasswordField}>
          <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
            <Controller
              name="password"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <LabelPasswordInput label={t('auth.password')} placeholder={t('auth.enterPassword')} {...rest} />
              )}
            />
            {errors.password && <ErrorMessage value={errors.password.message} />}
          </BaseFlex>
          <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
            <Controller
              name="password_confirm"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <LabelPasswordInput label={t('auth.password')} placeholder={t('auth.enterPassword')} {...rest} />
              )}
            />
            {errors.password_confirm && <ErrorMessage value={errors.password_confirm.message} />}
          </BaseFlex>
          <BaseButton
            onClick={clearPassword}
            size="large"
            type="text"
            htmlType="button"
            className={styles.button}
            icon={<AlertCircled className={styles.icon} />}
            value={t<string>('profile.loginAndPassword.resetPassword')}
          />
        </BaseFlex>
      </form>
      <BaseFlex justifyContent={JustifyContent.END} className={buttonStyles.buttons}>
        <BaseButton
          className={buttonStyles.cancelButton}
          onClick={() => reset(defaultValues)}
          value={t<string>('profile.buttons.cancel')}
          size="large"
          type="default"
          htmlType="button"
        />
        <BaseButton
          form="hook-form-username"
          className={buttonStyles.submitButton}
          value={t<string>('profile.buttons.save')}
          size="large"
          type="primary"
        />
      </BaseFlex>
    </>
  );
};

export default connector(ProfileLoginInfo);
