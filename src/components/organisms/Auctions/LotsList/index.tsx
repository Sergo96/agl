import React from 'react';
import { useTranslation } from 'react-i18next';
import { JustifyContent } from 'interfaces/flex';
import { ILotsResult } from 'interfaces/auctions';
import { IProps } from 'interfaces/props';
import EmptyAuctionsData from 'molecules/EmptyAuctionsData';
import LotCard from 'molecules/LotCard';
import BaseFlex from 'atoms/Flex';
import styles from './index.module.scss';


interface Props extends IProps {
  data: ILotsResult[];
  lotType: string;
  rejectAuctionInvite?: (id: number) => void;
}
const LotsList: React.FC<Props> = ({ data, lotType, rejectAuctionInvite, }) => {
  const [t] = useTranslation('common')
  return (
    <BaseFlex justifyContent={JustifyContent.START} className={styles.root}>
        <BaseFlex className={styles.wrp}>
        {data.length ? (
          <div className={styles.grid}>
          {data.map((item: ILotsResult) => (
            <LotCard
              key={item.id}
              data={item}
              lotType={lotType}
              rejectAuctionInvite={rejectAuctionInvite}
            />
          ))}
        </div>
           ) : (
            <EmptyAuctionsData isBtn={true} value={t<string>('auctions.userHasNoAuctions')} />
          )} 
        </BaseFlex>
    
    </BaseFlex>
  );
};

export default LotsList;
