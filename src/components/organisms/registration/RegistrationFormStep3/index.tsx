import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import BaseButton from 'atoms/Button';
import BaseFlex from 'atoms/Flex';
import WarningInfo from 'molecules/WarningInfo';
import TrusteeRegistrationInfo from 'molecules/TrusteeRegistrationInfo';
import { IAysAgroState } from 'store';
import { updateRegistrationInfo } from 'actions/auth';
import { userRegInfoSelector } from 'selectors/auth';
import { FlexDirection, JustifyContent } from 'interfaces/flex';
import { ArrowsNavigation } from 'interfaces/auth';
import { IRegistrationDataStep3 } from 'interfaces/auth';
import { IBaseDTO } from 'interfaces/general';
import registrationStyles from '../index.module.scss';
import styles from './index.module.scss';

const mapDispatchToProps = {
  submitData: (data: IRegistrationDataStep3) => updateRegistrationInfo(data),
};

const mapStateToProps = (state: IAysAgroState) => ({
  regInfo: userRegInfoSelector(state),
});
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux, ArrowsNavigation {
  statusList: IBaseDTO[];
}

const RegistrationFormStep3: React.FC<Props> = ({ submitData, regInfo, statusList, prev, next }) => {
  const [t] = useTranslation('common');

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('auth.validation.required')),
    email: Yup.string().email(t('auth.validation.enterValidEmail')).required(t('auth.validation.required')),
    status: Yup.number().required(t('auth.validation.required')),
    mobile_phone: Yup.string().required(t('auth.validation.required')).max(15, t('auth.validation.maximumPhoneLength')),
    work_phone: Yup.string().required(t('auth.validation.required')).max(15, t('auth.validation.maximumPhoneLength')),
  });

  const defaultValues: IRegistrationDataStep3 = {
    name: regInfo.name,
    email: regInfo.email,
    status: regInfo.status,
    mobile_phone: regInfo.mobile_phone,
    work_phone: regInfo.work_phone,
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegistrationDataStep3>({ defaultValues, resolver: yupResolver(validationSchema) });

  const onSubmit = (data: IRegistrationDataStep3) => {
    const updatedReg = {
      ...regInfo,
      ...data,
    };
    next();
    submitData(updatedReg);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TrusteeRegistrationInfo control={control} errors={errors} statusList={statusList} />
      <WarningInfo className={styles.info} value={t('registration.step3.warning')} />
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

export default connector(RegistrationFormStep3);
