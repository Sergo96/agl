import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorMessage from 'atoms/ErrorMessage';
import BaseButton from 'atoms/Button';
import BaseFlex from 'atoms/Flex';
import LabelInputArea from 'molecules/LabelInputArea';
import LabelDateInput from 'molecules/LabelDateInput';
import LabelInput from 'molecules/LabelInput';
import LabelSelectInput from 'molecules/LabelSelectInput';
import { JustifyContent, FlexDirection } from 'interfaces/flex';
import { ICompanyProfileInfo } from 'interfaces/profile';
import { loadingCompanyInfo, updateCompanyProfile } from 'actions/profile';
import { connect, ConnectedProps } from 'react-redux';
import { companyProfileInfoSelector } from 'selectors/profile';
import { IAysAgroState } from 'store';
import { countryListSelector, ownershipListSelector } from 'selectors/general';
import { loadingCountryList, loadingOwnershipList } from 'actions/general';
import styles from './index.module.scss';

const mapStateToProps = (state: IAysAgroState) => ({
  companyInfo: companyProfileInfoSelector(state),
  countryList: countryListSelector(state),
  ownershipList: ownershipListSelector(state),
});

const mapDispatchToProps = {
  updateCompanyProfileData: (data: ICompanyProfileInfo, notification: string) =>
    updateCompanyProfile(data, notification),
  loadCompanyInfo: () => loadingCompanyInfo(),
  loadCountryList: () => loadingCountryList(true),
  loadOwnershipList: () => loadingOwnershipList(),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {}

const ProfileCompanyInfo: React.FC<Props> = ({
  countryList,
  ownershipList,
  companyInfo,
  updateCompanyProfileData,
  loadCompanyInfo,
  loadCountryList,
  loadOwnershipList,
}) => {
  const [t] = useTranslation('common');
  const { i18n } = useTranslation('common');

  useEffect(() => {
    loadCompanyInfo();
    loadCountryList();
    loadOwnershipList();
  }, [i18n.language]);

  useEffect(() => {
    reset(companyInfo);
  }, [companyInfo]);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('auth.validation.required')),
    country: Yup.object().shape({
      id: Yup.number().required(t('auth.validation.required')),
    }),
    field_of_activity: Yup.string().nullable(),
    ownership: Yup.object().shape({
      id: Yup.number().required(t('auth.validation.required')),
    }),
    date_create: Yup.string().required(t('auth.validation.required')),
    legal_address: Yup.string().required(t('auth.validation.required')),
    actual_address: Yup.string().required(t('auth.validation.required')),
    payer_id: Yup.string()
      .required(t('auth.validation.required'))
      .matches(/^[0-9]+$/, t('auth.validation.numberRequired')),
    office_phone: Yup.string().required(t('auth.validation.required')).max(15, t('auth.validation.maximumPhoneLength')),
    office_email: Yup.string().email(t('auth.validation.enterValidEmail')).required(t('auth.validation.required')),
    description_company: Yup.string().nullable(),
  });
  const defaultValues: ICompanyProfileInfo = { ...companyInfo };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ICompanyProfileInfo>({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const countryOptions = countryList.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  const ownershipOptions = ownershipList.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  const onSubmit = (data: ICompanyProfileInfo) => {
    updateCompanyProfileData(data, t<string>('notifications.profileUpdateSuccess'));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseFlex className={styles.root} justifyContent={JustifyContent.SPACE_BETWEEN}>
        <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
          <Controller
            name="name"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <LabelInput
                label={t('registration.step2.company.name.label')}
                placeholder={t('registration.step2.company.name.placeholder')}
                className={styles.formSelectField}
                {...rest}
              />
            )}
          />
          {errors?.name && <ErrorMessage value={errors?.name?.message} />}
        </BaseFlex>

        <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
          <Controller
            name="country.id"
            control={control}
            render={({ field: { ref, ...rest } }) => {
              return (
                <LabelSelectInput
                  label={t('registration.step2.company.country.label')}
                  placeholder={t('registration.step2.company.country.placeholder')}
                  className={styles.selectField}
                  options={countryOptions}
                  {...rest}
                />
              );
            }}
          />
        </BaseFlex>

        <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
          <Controller
            name="field_of_activity"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <LabelInput
                label={t('profile.company.activities.label')}
                placeholder={t('profile.company.activities.placeholder')}
                {...rest}
              />
            )}
          />
          {errors?.field_of_activity && <ErrorMessage value={errors?.field_of_activity?.message} />}
        </BaseFlex>

        <BaseFlex className={styles.formFieldSmall}>
          <Controller
            name="ownership.id"
            control={control}
            render={({ field: { ref, ...rest } }) => {
              return (
                <LabelSelectInput
                  label={t('registration.step2.company.ownership.label')}
                  placeholder={t('registration.step2.company.ownership.placeholder')}
                  className={styles.formSelectField}
                  options={ownershipOptions}
                  {...rest}
                />
              );
            }}
          />
        </BaseFlex>

        <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.formFieldSmall}>
          <Controller
            name="date_create"
            control={control}
            render={({ field: { ref, ...rest } }) => <LabelDateInput label="Дата основания" {...rest} />}
          />
          {errors?.date_create && <ErrorMessage value={errors?.date_create?.message} />}
        </BaseFlex>

        <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
          <Controller
            name="legal_address"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <LabelInput
                label={t('registration.step2.company.legalAddress.label')}
                placeholder={t('registration.step2.company.legalAddress.placeholder')}
                {...rest}
              />
            )}
          />
          {errors?.legal_address && <ErrorMessage value={errors?.legal_address.message} />}
        </BaseFlex>

        <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
          <Controller
            name="actual_address"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <LabelInput
                label={t('registration.step2.company.actualAddress.label')}
                placeholder={t('registration.step2.company.actualAddress.placeholder')}
                {...rest}
              />
            )}
          />
          {errors?.actual_address && <ErrorMessage value={errors?.actual_address?.message} />}
        </BaseFlex>

        <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN} className={styles.formFieldLarge}>
          <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.formFieldMedium}>
            <Controller
              name="payer_id"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <LabelInput
                  label={t('registration.step2.company.payerId.label')}
                  placeholder={t('registration.step2.company.payerId.placeholder')}
                  {...rest}
                />
              )}
            />
            {errors?.payer_id && <ErrorMessage value={errors?.payer_id.message} />}
          </BaseFlex>

          <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.formFieldMedium}>
            <Controller
              name="office_phone"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <LabelInput
                  label={t('registration.step2.company.officePhone.label')}
                  placeholder={t('registration.step2.company.officePhone.placeholder')}
                  {...rest}
                />
              )}
            />
            {errors?.office_phone && <ErrorMessage value={errors?.office_phone?.message} />}
          </BaseFlex>
          <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.formFieldMedium}>
            <Controller
              name="office_email"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <LabelInput
                  label={t('registration.step2.company.officeEmail.label')}
                  type="secondary"
                  placeholder={t('registration.step2.company.officeEmail.placeholder')}
                  {...rest}
                />
              )}
            />
            {errors?.office_email && <ErrorMessage value={errors?.office_email?.message} />}
          </BaseFlex>
        </BaseFlex>
        <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.formFieldLarge}>
          <Controller
            name="description_company"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <LabelInputArea
                className={styles.formInputAreaField}
                label={t('profile.company.description.label')}
                placeholder={t('profile.company.description.placeholder')}
                type="secondary"
                {...rest}
              />
            )}
          />
          {errors?.description_company && <ErrorMessage value={errors?.description_company?.message} />}
        </BaseFlex>
      </BaseFlex>
      <BaseFlex justifyContent={JustifyContent.END} className={styles.buttons}>
        <BaseButton
          className={styles.cancelButton}
          onClick={() => reset(defaultValues)}
          value={t<string>('profile.buttons.cancel')}
          size="large"
          type="default"
          htmlType="button"
        />
        <BaseButton
          className={styles.submitButton}
          value={t<string>('profile.buttons.save')}
          size="large"
          type="primary"
        />
      </BaseFlex>
    </form>
  );
};
export default connector(ProfileCompanyInfo);
