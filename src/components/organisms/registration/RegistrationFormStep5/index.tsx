import React from 'react';
import { NextRouter, useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import * as Yup from 'yup';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import ErrorMessage from 'atoms/ErrorMessage';
import BaseFlex from 'atoms/Flex';
import BaseButton from 'atoms/Button';
import WarningInfo from 'molecules/WarningInfo';
import LabelPasswordInput from 'molecules/LabelPasswordInput';
import LabelInput from 'molecules/LabelInput';
import { IAysAgroState } from 'store';
import { register } from 'actions/auth';
import { userRegInfoSelector } from 'selectors/auth';
import { IRegistrationDataStep5 } from 'interfaces/auth';
import { passwordValidationRegex } from 'utils/validation/regex';
import { FlexDirection, JustifyContent } from 'interfaces/flex';
import styles from './index.module.scss';
import registrationStyles from '../index.module.scss';

const mapDispatchToProps = {
  submitData: (data: IRegistrationDataStep5, router: NextRouter, notification: string) =>
    register(data, router, notification),
};

const mapStateToProps = (state: IAysAgroState) => ({
  regInfo: userRegInfoSelector(state),
});
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {
  prev: () => void;
}

const RegistrationFormStep5: React.FC<Props> = ({ submitData, regInfo, prev }) => {
  const [t] = useTranslation('common');
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t('auth.validation.required')),
    password1: Yup.string()
      .matches(passwordValidationRegex, t('auth.validation.passwordValidationTitle'))
      .required(t('auth.validation.passwordMatch')),
    password2: Yup.string().oneOf([Yup.ref('password1'), null], t('auth.validation.passwordMatch')),
  });

  const defaultValues: IRegistrationDataStep5 = {
    username: '',
    password1: '',
    password2: '',
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegistrationDataStep5>({ defaultValues, resolver: yupResolver(validationSchema) });
  const onSubmit = (data: IRegistrationDataStep5) => {
    const updatedReg = {
      ...regInfo,
      ...data,
    };
    submitData(updatedReg, router, t<string>('notifications.registrationSuccess'));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form}>
        <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
          <Controller
            name="username"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <LabelInput label={t('auth.login')} placeholder={t<string>('auth.enterLogin')} {...rest} />
            )}
          />
          {errors.username && <ErrorMessage value={errors.username.message} />}
        </BaseFlex>
        <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN} className={styles.formPasswordField}>
          <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
            <Controller
              name="password1"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <LabelPasswordInput label={t('auth.password')} placeholder={t('auth.enterPassword')} {...rest} />
              )}
            />
            {errors.password1 && <ErrorMessage value={errors.password1.message} />}
          </BaseFlex>
          <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
            <Controller
              name="password2"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <LabelPasswordInput label={t('auth.password')} placeholder={t('auth.enterPassword')} {...rest} />
              )}
            />
            {errors.password2 && <ErrorMessage value={errors.password2.message} />}
          </BaseFlex>
        </BaseFlex>
      </div>

      <WarningInfo className={styles.info} value={t('registration.step5.warning')} />
      <BaseFlex
        justifyContent={JustifyContent.SPACE_BETWEEN}
        flexDirection={FlexDirection.ROW}
        className={registrationStyles.stepsAction}
      >
        <BaseButton
          className={registrationStyles.btnBack}
          icon={<LeftOutlined />}
          type="link"
          onClick={prev}
          value={t<string>('registration.navigation.prevStep')}
        />
        <BaseButton
          className={registrationStyles.btnNext}
          icon={<RightOutlined />}
          type="primary"
          value={t<string>('registration.navigation.nextStep')}
        />
      </BaseFlex>
    </form>
  );
};

export default connector(RegistrationFormStep5);
