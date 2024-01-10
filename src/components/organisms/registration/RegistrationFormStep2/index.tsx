import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { ArrowsNavigation } from 'interfaces/auth';
import WarningInfo from 'molecules/WarningInfo';
import BaseButton from 'atoms/Button';
import BaseFlex from 'atoms/Flex';
import CompanyRegistrationInfo from 'molecules/CompanyRegistrationInfo';
import { IAysAgroState } from 'store';
import { connect, ConnectedProps } from 'react-redux';
import { updateRegistrationInfo } from 'actions/auth';
import { userRegInfoSelector } from 'selectors/auth';
import { FlexDirection, JustifyContent } from 'interfaces/flex';
import { IRegistrationDataStep2 } from 'interfaces/auth';
import { ICountry, IBaseDTO } from 'interfaces/general';
import registrationStyles from '../index.module.scss';
import styles from './index.module.scss';

const mapDispatchToProps = {
  submitData: (data: IRegistrationDataStep2) => updateRegistrationInfo(data),
};

const mapStateToProps = (state: IAysAgroState) => ({
  regInfo: userRegInfoSelector(state),
});
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux, ArrowsNavigation {
  countryList: ICountry[];
  ownershipList: IBaseDTO[];
}

const RegistrationFormStep2: React.FC<Props> = ({ submitData, regInfo, prev, next, countryList, ownershipList }) => {
  const [t] = useTranslation('common');

  const validationSchema = Yup.object().shape({
    company: Yup.object({
      name: Yup.string().required(t('auth.validation.required')),
      ownership: Yup.number().required(t('auth.validation.required')),
      payer_id: Yup.string()
        .required(t('auth.validation.required'))
        .matches(/^[0-9]+$/, t('auth.validation.numberRequired')),
      legal_address: Yup.string().required(t('auth.validation.required')),
      actual_address: Yup.string().required(t('auth.validation.required')),
      office_phone: Yup.string()
        .required(t('auth.validation.required'))
        .max(15, t('auth.validation.maximumPhoneLength')),
      office_email: Yup.string().email(t('auth.validation.enterValidEmail')).required(t('auth.validation.required')),
      country: Yup.number().required(t('auth.validation.required')),
    }),
  });

  const defaultValues: IRegistrationDataStep2 = {
    company: {
      name: regInfo.company?.name,
      ownership: regInfo.company?.ownership,
      legal_address: regInfo.company?.legal_address,
      payer_id: regInfo.company?.payer_id,
      actual_address: regInfo.company?.actual_address,
      office_phone: regInfo.company?.office_phone,
      office_email: regInfo.company?.office_email,
      country: regInfo.company?.country,
    },
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm<IRegistrationDataStep2>({ defaultValues, resolver: yupResolver(validationSchema) });

  const onSubmit = (data: IRegistrationDataStep2) => {
    const updatedReg = {
      ...regInfo,
      ...data,
    };
    next();
    submitData(updatedReg);
  };

  const copyLegalAddress = () => {
    const value = getValues('company.legal_address');
    setValue('company.actual_address', value, {
      shouldValidate: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CompanyRegistrationInfo
        copyLegalAddress={copyLegalAddress}
        control={control}
        errors={errors}
        countryList={countryList}
        ownershipList={ownershipList}
      />
      <WarningInfo className={styles.info} value={t('registration.step2.warning')} />
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

export default connector(RegistrationFormStep2);
