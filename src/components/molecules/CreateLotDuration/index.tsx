import React from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldError } from 'react-hook-form';
import { ICreateLot, IExpiredAtTime } from 'interfaces/auctions';
import { IProps } from 'interfaces/props';
import { FlexDirection } from 'interfaces/flex';
import { TypeOperation } from 'interfaces/general';
import { IOption } from 'interfaces/options';
import LabelSelectInput from 'molecules/LabelSelectInput';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import ErrorMessage from 'atoms/ErrorMessage';
import styles from './index.module.scss';

interface Props extends IProps {
  control: Control<ICreateLot>;
  lotsExpiredAtList: IExpiredAtTime[];
  error: FieldError | undefined;
  typeOperation?: TypeOperation
}

const CreateLotDuration: React.FC<Props> = ({ control, lotsExpiredAtList, error, typeOperation }) => {
  const [t] = useTranslation('common');

  const options: IOption[] = lotsExpiredAtList.map((i) => ({ value: i.value, label: i.time }));

  return (
    <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.section}>
      <BaseTypography weight="bold" size="lg" value={typeOperation === 'auction' ? t<string>('auctions.create.step2.title5Auction') : t<string>('auctions.create.step2.title5CommercialOffer') } />
      <BaseFlex className={styles.wrp}>
        <Controller
          render={({ field: { ref, onChange, ...rest } }) => (
            <LabelSelectInput
              label={t('auctions.create.step2.period')}
              options={options}
              classNameLabel={styles.label}
              classNameSelect={styles.selector}
              className={styles.item}
              onChange={onChange}
              {...rest}
            />
          )}
          name={'expired_at'}
          control={control}
        />
         {error && <ErrorMessage value={error.message} />}
      </BaseFlex>
    </BaseFlex>
  );
};

export default React.memo(CreateLotDuration);
