import React from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldError } from 'react-hook-form';
import { ICreateLot } from 'interfaces/auctions';
import { IProps } from 'interfaces/props';
import { FlexDirection } from 'interfaces/flex';
import { TypeOperation } from 'interfaces/general';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import ErrorMessage from 'atoms/ErrorMessage';
import styles from './index.module.scss';
import LabelInputNumber from 'molecules/LabelInputNumber';

interface Props extends IProps {
  control: Control<ICreateLot>;
  error: FieldError | undefined;
  typeOperation?: TypeOperation
}

const CreateLotProductPriceForTon: React.FC<Props> = ({ control, error, typeOperation }) => {
  const [t] = useTranslation('common');

  return (
    <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.section}>
      <BaseTypography weight="bold" size="lg" value={t<string>('auctions.create.step2.title5CustomCurrentProduct') } />
      <BaseFlex className={styles.wrp}>
      <Controller
          render={({ field: { ref, ...rest } }) => (
            <LabelInputNumber
              classNameInput={styles.inputValue}
              classNameLabel={styles.label}
              className={styles.item}
              label={t('auctions.create.step2.price')}
              {...rest}
            />
          )}
          control={control}
          name={'price'}
        />
         {error && <ErrorMessage value={error.message} />}
      </BaseFlex>
    </BaseFlex>
  );
};

export default React.memo(CreateLotProductPriceForTon);
