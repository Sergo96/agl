import React from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import BaseFlex from 'atoms/Flex';
import LabelInput from 'molecules/LabelInput';
import ErrorMessage from 'atoms/ErrorMessage';
import { DeepMap, FieldError, FieldValues } from 'react-hook-form/dist/types';
import { Control } from 'react-hook-form/dist/types';
import { FlexDirection, JustifyContent } from 'interfaces/flex';
import { IRegistrationDataStep3 } from 'interfaces/auth';
import { IProps } from 'interfaces/props';
import { IBaseDTO } from 'interfaces/general';
import LabelSelectInput from 'molecules/LabelSelectInput';
import styles from './index.module.scss';

interface Props extends IProps {
  control: Control<IRegistrationDataStep3>;
  errors: DeepMap<FieldValues, FieldError>;
  statusList: IBaseDTO[];
}

const TrusteeRegistrationInfo: React.FC<Props> = ({ control, errors, statusList }) => {
  const [t] = useTranslation('common');
  const statusOptions = statusList.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });

  return (
    <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN}>
      <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
        <Controller
          name="name"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <LabelInput
              label={t('registration.step3.name.label')}
              placeholder={t('registration.step3.name.placeholder')}
              {...rest}
            />
          )}
        />
        {errors?.name && <ErrorMessage value={errors?.name?.message} />}
      </BaseFlex>

      <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
        <Controller
          name="status"
          control={control}
          render={({ field: { ref, ...rest } }) => {
            return (
              <LabelSelectInput
                label={t('registration.step3.status.label')}
                placeholder={t('registration.step3.status.placeholder')}
                className={styles.selectField}
                options={statusOptions}
                {...rest}
              />
            );
          }}
        />
        {errors?.status && <ErrorMessage value={errors?.status?.message} />}
      </BaseFlex>
      <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
        <Controller
          name="mobile_phone"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <LabelInput
              label={t('registration.step3.mobilePhone.label')}
              placeholder={t('registration.step3.mobilePhone.placeholder')}
              {...rest}
            />
          )}
        />
        {errors?.mobile_phone && <ErrorMessage value={errors?.mobile_phone?.message} />}
      </BaseFlex>
      <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
        <Controller
          name="work_phone"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <LabelInput
              label={t('registration.step3.workPhone.label')}
              placeholder={t('registration.step3.workPhone.placeholder')}
              {...rest}
            />
          )}
        />
        {errors?.workPhone && <ErrorMessage value={errors?.workPhone?.message} />}
      </BaseFlex>
      <BaseFlex className={styles.formField} flexDirection={FlexDirection.COLUMN}>
        <Controller
          name="email"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <LabelInput
              label={t('registration.step3.email.label')}
              placeholder={t('registration.step3.email.placeholder')}
              {...rest}
            />
          )}
        />
        {errors?.email && <ErrorMessage value={errors?.email?.message} />}
      </BaseFlex>
    </BaseFlex>
  );
};

export default TrusteeRegistrationInfo;
