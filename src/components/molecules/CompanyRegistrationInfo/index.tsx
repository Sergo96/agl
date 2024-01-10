import React from 'react';
import { Control } from 'react-hook-form/dist/types/form';
import { DeepMap, FieldError, FieldValues } from 'react-hook-form/dist/types';
import BaseFlex from 'atoms/Flex';
import { IRegistrationDataStep2 } from 'interfaces/auth';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import LabelInput from 'molecules/LabelInput';
import TwoLabelsInput from 'molecules/TwoLabelsInput';
import LabelSelectInput from 'molecules/LabelSelectInput';
import ErrorMessage from 'atoms/ErrorMessage';
import { IProps } from 'interfaces/props';
import { FlexDirection, JustifyContent } from 'interfaces/flex';
import { ICountry, IBaseDTO } from 'interfaces/general';
import styles from './index.module.scss';

interface Props extends IProps {
  control: Control<IRegistrationDataStep2>;
  errors: DeepMap<FieldValues, FieldError>;
  copyLegalAddress: (e: React.MouseEvent<HTMLElement>) => void;
  countryList: ICountry[];
  ownershipList: IBaseDTO[];
}

const CompanyRegistrationInfo: React.FC<Props> = ({
  control,
  errors,
  copyLegalAddress,
  countryList,
  ownershipList,
}) => {
  const [t] = useTranslation('common');

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
  return (
    <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN}>
      <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
        <Controller
          name="company.name"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <LabelInput
              label={t('registration.step2.company.name.label')}
              placeholder={t('registration.step2.company.name.placeholder')}
              {...rest}
            />
          )}
        />
        {errors?.company?.name && <ErrorMessage value={errors?.company?.name?.message} />}
      </BaseFlex>

      <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
        <Controller
          name="company.ownership"
          control={control}
          render={({ field: { ref, ...rest } }) => {
            return (
              <LabelSelectInput
                label={t('registration.step2.company.ownership.label')}
                placeholder={t('registration.step2.company.ownership.placeholder')}
                className={styles.selectField}
                options={ownershipOptions}
                {...rest}
              />
            );
          }}
        />
        {errors?.company?.ownership && <ErrorMessage value={errors?.company?.ownership?.message} />}
      </BaseFlex>

      <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
        <Controller
          name="company.legal_address"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <LabelInput
              label={t('registration.step2.company.legalAddress.label')}
              placeholder={t('registration.step2.company.legalAddress.placeholder')}
              {...rest}
            />
          )}
        />
        {errors?.company?.legal_address && <ErrorMessage value={errors?.company?.legal_address.message} />}
      </BaseFlex>

      <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
        <Controller
          name="company.payer_id"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <LabelInput
              label={t('registration.step2.company.payerId.label')}
              placeholder={t('registration.step2.company.payerId.placeholder')}
              {...rest}
            />
          )}
        />
        {errors?.company?.payer_id && <ErrorMessage value={errors?.company?.payer_id.message} />}
      </BaseFlex>
      <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
        <Controller
          name="company.actual_address"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <TwoLabelsInput
              onClickSecondLabel={copyLegalAddress}
              label={t('registration.step2.company.actualAddress.label')}
              secondLabel={t('registration.step2.company.actualAddress.secondLabel')}
              placeholder={t('registration.step2.company.actualAddress.placeholder')}
              {...rest}
            />
          )}
        />
        {errors?.company?.actual_address && <ErrorMessage value={errors?.company?.actual_address?.message} />}
      </BaseFlex>
      <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN} className={styles.formField}>
        <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.formFieldSmall}>
          <Controller
            name="company.office_phone"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <LabelInput
                label={t('registration.step2.company.officePhone.label')}
                placeholder={t('registration.step2.company.officePhone.placeholder')}
                {...rest}
              />
            )}
          />
          {errors?.company?.office_phone && <ErrorMessage value={errors?.company?.office_phone?.message} />}
        </BaseFlex>
        <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.formFieldSmall}>
          <Controller
            name="company.office_email"
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
          {errors?.company?.office_email && <ErrorMessage value={errors?.company?.office_email?.message} />}
        </BaseFlex>
      </BaseFlex>
      <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
        <Controller
          name="company.country"
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
        {errors?.company?.country && <ErrorMessage value={errors?.company?.country?.message} />}
      </BaseFlex>
    </BaseFlex>
  );
};

export default CompanyRegistrationInfo;
