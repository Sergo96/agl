import React from 'react';
import { Controller, Control, FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IProps } from 'interfaces/props';
import { ICreateLot } from 'interfaces/auctions';
import { FlexDirection, AlignItems } from 'interfaces/flex';
import BaseFlex from 'atoms/Flex';
import ErrorMessage from 'atoms/ErrorMessage';
import BaseTypography from 'atoms/Typography';
import LabelInputNumber from 'molecules/LabelInputNumber';
import styles from './index.module.scss';

interface Props extends IProps {
  control: Control<ICreateLot>;
  error: FieldError | undefined;
}

const EditLotPlaceBet: React.FC<Props> = ({ control, error }) => {
  const [t] = useTranslation('common');

  return (
    <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.section}>
      <BaseTypography
        className={styles.header}
        weight="bold"
        size="lg"
        value={t<string>('auctions.create.step2.title4Edit')}
      />
      <BaseFlex alignItems={AlignItems.FLEX_END}>
        <Controller
          name={'price'}
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <LabelInputNumber
              classNameInput={styles.inputValue}
              classNameLabel={styles.label}
              className={styles.item}
              {...rest}
            />
          )}
        />
        {error && <ErrorMessage value={error.message} />}
      </BaseFlex>
    </BaseFlex>
  );
};

export default EditLotPlaceBet;
