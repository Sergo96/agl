import React from 'react';
import { useTranslation } from 'react-i18next';
import { JustifyContent } from 'interfaces/flex';
import { ILotsResult } from 'interfaces/auctions';
import { IProps } from 'interfaces/props';
import EmptyAuctionsData from 'molecules/EmptyAuctionsData';
import CustomCurrentProductCard from 'molecules/CustomCurrentProductCard';
import BaseFlex from 'atoms/Flex';
import styles from './index.module.scss';

interface Props extends IProps {
  data: ILotsResult[];
  lotType: string;
}

const CustomCurrentProductList: React.FC<Props> = ({ data, lotType }) => {
  const [t] = useTranslation('common')
  return (
    <BaseFlex justifyContent={JustifyContent.START} className={styles.root}>
        <BaseFlex className={styles.wrp}>
        {data.length ? (
          <div className={styles.grid}>
          {data.map((item: ILotsResult) => (
            <CustomCurrentProductCard
              key={item.id}
              lotType={lotType}
              data={item}
            />
          ))}
        </div>
           ) : (
            <EmptyAuctionsData isBtn={true} value={t<string>('customCurrentProducts.userHasNoItems')} />
          )} 
        </BaseFlex>
    
    </BaseFlex>
  );
};

export default CustomCurrentProductList;
