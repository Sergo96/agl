import React from 'react';
import styles from './index.module.scss';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import { AlignItems } from 'interfaces/flex';
import ArrowDown from 'icons/ArrowDown';
import { IProps } from 'interfaces/props';
import { ICurrencies } from 'interfaces/baseInfo';

interface Props extends IProps {
  currencies?: ICurrencies[];
}

const CurrenciesTabs: React.FC<Props> = ({ currencies, ...props }) => {
  return (
    <BaseFlex {...props}>
      {currencies?.map((item) => {
        return (
          <BaseFlex alignItems={AlignItems.CENTER} key={item.id} className={styles.currency}>
            <BaseTypography value={item.iso_code} />
            <ArrowDown className={styles.arrow} color="#FF4D4F" />
            <BaseTypography value={item.costs} />
          </BaseFlex>
        );
      })}
    </BaseFlex>
  );
};

export default CurrenciesTabs;
