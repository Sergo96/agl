import React from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldError } from 'react-hook-form';
import { IProps } from 'interfaces/props';
import { FlexDirection, AlignItems } from 'interfaces/flex';
import { IBaseDTO } from 'interfaces/general';
import { ICreateLot } from 'interfaces/auctions';
import LabelSelectInput from 'molecules/LabelSelectInput';
import LabelInputNumber from 'molecules/LabelInputNumber';
import ErrorMessage from 'atoms/ErrorMessage';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import styles from './index.module.scss';

interface Props extends IProps {
  control: Control<ICreateLot>;
  data: ICreateLot;
  error: FieldError | undefined;
  units: IBaseDTO[];
  header: string;
}

const CreateLotIndicateValue: React.FC<Props> = ({ control, data, error, units, header, }) => {
  const [t] = useTranslation('common');
  const options = units.map((i: IBaseDTO) => {
    return {
      value: i.id,
      label: i.name,
    };
  });
  return (
    <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.section}>
      <BaseTypography weight="bold" size="lg" value={header} />
      <BaseFlex className={styles.wrp} alignItems={AlignItems.FLEX_END}>
        <Controller
          render={({ field: { ref, ...rest } }) => (
            <LabelInputNumber
              classNameInput={styles.inputValue}
              classNameLabel={styles.label}
              className={styles.item}
              label={t('auctions.create.step2.quantityLabel')}
              {...rest}
            />
          )}
          control={control}
          name={'quantity'}
        />
        <Controller
          render={({ field: { ref, ...rest } }) => (
            <LabelSelectInput
              label={t('auctions.create.step2.units')}
              options={options}
              classNameLabel={styles.label}
              classNameSelect={styles.selector}
              className={styles.item}
              {...rest}
            />
          )}
          name={'units'}
          control={control}
          defaultValue={data.units}
        />
      </BaseFlex>
      {error && <ErrorMessage value={error.message} />}
    </BaseFlex>
  );
};

export default React.memo(CreateLotIndicateValue);
