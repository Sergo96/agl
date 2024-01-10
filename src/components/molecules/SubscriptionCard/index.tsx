import React from 'react';
import BaseButton from 'atoms/Button';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import CheckmarkCircled from 'icons/CheckmarkCircled';
import { AlignContent, FlexDirection, JustifyContent } from 'interfaces/flex';
import { IProps } from 'interfaces/props';
import { ITariffsInfo } from 'interfaces/subscriptions';
import classNames from 'classnames';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
import CheckmarkCircledGray from 'icons/CheckmarkCircledGray';

interface Props extends IProps {
  tariffInfo: ITariffsInfo;
  selectPlan: (id: number) => void;
  currentTariffInfo?: ITariffsInfo;
}

const SubscriptionCard: React.FC<Props> = ({ tariffInfo, currentTariffInfo, selectPlan }) => {
  const [t] = useTranslation('common');

  const titleStyle = (id: number) => {
    switch (id) {
      case 1:
        return styles.titleStarter;
      case 2:
        return styles.titleProfessional;
      case 3:
        return styles.titlePremium;
      default:
        return 'main';
    }
  };

  const timestamp = Number(currentTariffInfo?.expired_at);
  const currentTariffActiveDate = new Date(timestamp * 1000).toLocaleDateString('ru-RU');

  const isCurrentPlan = currentTariffInfo?.id === tariffInfo?.id;

  const rootStyles = classNames(styles.root, !isCurrentPlan && styles.rootNotSelected);
  const titleStyles = classNames(styles.title, isCurrentPlan ? titleStyle(tariffInfo.id) : styles.titleNotSelected);
  const CheckmarkIcon = isCurrentPlan ? <CheckmarkCircled /> : <CheckmarkCircledGray />;

  const button = (
    <div>
      {currentTariffInfo ? (
        isCurrentPlan ? (
          <BaseFlex className={styles.tariffInfo} justifyContent={JustifyContent.CENTER}>
            <BaseTypography
              color="primary"
              className={styles.planActive}
              value={t<string>('subscriptions.activePlan')}
            />
            <BaseTypography
              className={styles.planDate}
              value={`${t<string>('subscriptions.planDate')} ${currentTariffActiveDate} `}
            />
          </BaseFlex>
        ) : (
          <BaseFlex className={styles.button} justifyContent={JustifyContent.CENTER}>
            <BaseButton
              onClick={() => selectPlan(tariffInfo.id)}
              disabled
              value={t<string>('subscriptions.payment.select')}
            />
          </BaseFlex>
        )
      ) : (
        <BaseButton
          onClick={() => selectPlan(tariffInfo.id)}
          type="primary"
          value={t<string>('subscriptions.payment.select')}
        />
      )}
    </div>
  );

  return (
    <BaseFlex flexDirection={FlexDirection.COLUMN} className={rootStyles}>
      <div className={styles.cost}>
        <BaseTypography weight="light" size="xxxl" value={tariffInfo.cost} />
        <BaseTypography size="lg" value={` $/ ${t<string>('subscriptions.year')}`} />
      </div>
      <BaseFlex justifyContent={JustifyContent.CENTER} alignContent={AlignContent.CENTER} className={titleStyles}>
        <BaseTypography weight="medium" className={styles.titleText} value={tariffInfo.title} />
      </BaseFlex>
      <div className={styles.privileges}>
        <div className={styles.privilegesTitle}>
          <BaseTypography value={t<string>('subscriptions.advantages')} />
        </div>
        <div>
          {tariffInfo?.privileges?.map((privilege) => {
            return (
              <div key={privilege} className={styles.privilege}>
                <span className={styles.icon}>{CheckmarkIcon}</span>
                <BaseTypography value={privilege} />
              </div>
            );
          })}
        </div>
      </div>
      {button}
    </BaseFlex>
  );
};

export default SubscriptionCard;
