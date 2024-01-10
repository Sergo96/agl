import React from 'react';
import { useTranslation } from 'react-i18next';
import { Radio } from 'antd';
import { Controller, Control, FieldError } from 'react-hook-form';
import { IProps } from 'interfaces/props';
import { FlexDirection, JustifyContent } from 'interfaces/flex';
import { ICreateLot } from 'interfaces/auctions';
import { IGeneralNomenclatureItem } from 'interfaces/nomenclature';
import WarningInfo from 'molecules/WarningInfo';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import ErrorMessage from 'atoms/ErrorMessage';
import BaseRadioButton from 'atoms/RadioButton';
import styles from './index.module.scss';

interface Props extends IProps {
  product: IGeneralNomenclatureItem[];
  control: Control<ICreateLot>;
  error: FieldError | undefined;
  header: string;
}

const CreateLotSelectProduct: React.FC<Props> = ({ product, control, error, header, }) => {
  const [t] = useTranslation('common');

  return (
      <BaseFlex>
        <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.section}>
          <BaseTypography weight="bold" size="lg" value={header} />
          <BaseFlex justifyContent={JustifyContent.END} className={styles.searchComponent}>
          </BaseFlex>
          <BaseFlex className={styles.itemWrp}>
            <Controller
              name={'nomenclature'}
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <Radio.Group className={styles.grid} {...rest} >
                  {product.map((i) => (
                    <BaseRadioButton key={i.id} value={i.id} label={i.name} className={styles.radioBtn} />
                  ))}
                </Radio.Group>
              )}
            />
          </BaseFlex>
          {error && <ErrorMessage value={error.message} />}
          <WarningInfo className={styles.info} value={t<string>('auctions.create.step2.warning')} />
        </BaseFlex>
      </BaseFlex>
  );
};

export default React.memo(CreateLotSelectProduct);
