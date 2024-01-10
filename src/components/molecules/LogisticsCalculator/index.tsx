import React from 'react';
import BaseButton from 'atoms/Button';
import BaseFlex from 'atoms/Flex';
import LabelInput from 'molecules/LabelInput';
import BaseTypography from 'atoms/Typography';
import { AlignItems, FlexDirection, JustifyContent } from 'interfaces/flex';
import { useTranslation } from 'react-i18next';
import { IProps } from 'interfaces/props';
import styles from './index.module.scss';

interface Props extends IProps {
  setTariff: React.Dispatch<React.SetStateAction<number>>;
  setWeight: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  calculateLogisticsTotalCost: () => void;
  distance?: string;
  duration?: string;
  originValue: string;
  destinationValue: string;
}
const LogisticsCalculator: React.FC<Props> = ({
  setTariff,
  setWeight,
  total,
  calculateLogisticsTotalCost,
  distance,
  duration,
  originValue,
  destinationValue,
}) => {
  const [t] = useTranslation('common');

  return (
    <div>
      <BaseFlex className={styles.root} justifyContent={JustifyContent.SPACE_BETWEEN}>
        <div className={styles.calculator}>
          <BaseFlex className={styles.calculatorInputs} alignItems={AlignItems.FLEX_END}>
            <LabelInput
              onChange={(e) => setTariff(Number(e?.target?.value))}
              className={styles.calculatorInputField}
              label={t<string>('logistics.tariff')}
            />
            <LabelInput
              onChange={(e) => setWeight(Number(e?.target?.value))}
              className={styles.calculatorInputField}
              label={t<string>('logistics.weight')}
            />
            <BaseButton
              onClick={calculateLogisticsTotalCost}
              type="primary"
              className={styles.button}
              value={t<string>('logistics.calculate')}
            />
          </BaseFlex>
          <BaseFlex className={styles.outputValues} justifyContent={JustifyContent.SPACE_BETWEEN}>
            <BaseFlex className={styles.route} flexDirection={FlexDirection.COLUMN}>
              <BaseTypography value={t<string>('logistics.routeDetails')} />
              <BaseTypography weight="bold" value={t<string>(`${originValue} — ${destinationValue}`)} />
            </BaseFlex>
            <BaseFlex className={styles.distance} flexDirection={FlexDirection.COLUMN}>
              <BaseTypography value={`${t<string>('logistics.distance')} ~ ${distance}`} />
              <BaseTypography value={`${t<string>('logistics.time')} ~ ${duration}`} />
            </BaseFlex>
          </BaseFlex>
        </div>
        <BaseFlex className={styles.total}>
          <BaseFlex className={styles.totalOutput}>
            <BaseTypography size="xxl" value={t<string>('logistics.total')} />
            <BaseTypography size="xxl" className={styles.totalValue} value={`\u00A0${total}$`} />
          </BaseFlex>

          <BaseTypography className={styles.estimate} value={t<string>('logistics.estimate')} />
        </BaseFlex>
      </BaseFlex>
    </div>
  );
};
export default LogisticsCalculator;
