import React from 'react';
import BaseTypography from 'atoms/Typography';
import { useTranslation } from 'react-i18next';
import SubscriptionCard from 'molecules/SubscriptionCard';
import BaseFlex from 'atoms/Flex';
import { AlignSelf, FlexDirection, JustifyContent } from 'interfaces/flex';
import BaseLink from 'atoms/Link';
import styles from './index.module.scss';
import { ITariffsInfo } from 'interfaces/subscriptions';
import { IProps } from 'interfaces/props';

interface Props extends IProps {
  selectPlan: (tariffId: number) => void;
  tariffsInfo: ITariffsInfo[];
  currentTariffInfo?: ITariffsInfo;
}

const SubscriptionPlans: React.FC<Props> = ({ tariffsInfo, currentTariffInfo, selectPlan }) => {
  const [t] = useTranslation('common');

  return (
    <BaseFlex className={styles.root} alignSelf={AlignSelf.CENTER} flexDirection={FlexDirection.COLUMN}>
      <BaseTypography className={styles.title} weight="semi-bold" size="xxl" value={t<string>('subscriptions.title')} />
      <BaseFlex className={styles.subscriptionCards} justifyContent={JustifyContent.CENTER}>
        {tariffsInfo.map((tariffInfo) => {
          return (
            <SubscriptionCard
              currentTariffInfo={currentTariffInfo}
              selectPlan={selectPlan}
              key={tariffInfo.id}
              tariffInfo={tariffInfo}
            />
          );
        })}
      </BaseFlex>
      <div className={styles.bottomText}>
        <BaseTypography size="sm" value={t<string>('subscriptions.bottomText1')} />
        <BaseLink href={'/home'}>
          <BaseTypography size="sm" value={` ${t<string>('subscriptions.bottomText2')}`} />
        </BaseLink>
      </div>
    </BaseFlex>
  );
};
export default SubscriptionPlans;
