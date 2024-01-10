import { useTranslation } from 'react-i18next';
import { IProps } from 'interfaces/props';
import { JustifyContent } from 'interfaces/flex';
import { IConditions, IRequirements } from 'interfaces/homePage';
import HomePageTitle from 'molecules/HomePageTitle';
import RequirementItem from 'molecules/RequirementElement';
import BaseTypography from 'atoms/Typography';
import BaseButton from 'atoms/Button';
import BaseFlex from 'atoms/Flex';
import styles from './index.module.scss';
import { useState, useEffect } from 'react';

interface Props extends IProps {
  conditions: IConditions[];
  requirements: IRequirements[];
}

const ParticipationConditions: React.FC<Props> = ({ conditions, requirements }) => {
  const [t] = useTranslation('common');

  const [currentRequirements, setCurrentRequirements] = useState<IRequirements[]>([]);
  const [showAllRequirements, setShowAllRequirements] = useState<boolean>(false);

  useEffect(() => {
    const topRequirements = requirements.slice(0, 3);
    setCurrentRequirements(topRequirements);
  }, [requirements]);

  const onShowAllRequirements = () => {
    setShowAllRequirements(true);
  };

  return (
    <BaseFlex className={styles.mainWrp} justifyContent={JustifyContent.CENTER}>
      <BaseFlex className={styles.wrp}>
        <HomePageTitle className={styles.title} value={t('homePage.conditionsTitle')} />
        <div className={styles.grid}>
          <BaseFlex className={styles.descriptionWrp}>
            {conditions.map((condition: IConditions) => (
              <BaseTypography className={styles.subtitle} key={condition.number} value={condition.text} />
            ))}
          </BaseFlex>
          <BaseFlex className={styles.requirementsList}>
            {!showAllRequirements
              ? currentRequirements.map((requirement: IRequirements) => (
                  <RequirementItem key={requirement.number} title={requirement.title} description={requirement.text} />
                ))
              : requirements.map((requirement: IRequirements) => (
                  <RequirementItem key={requirement.number} title={requirement.title} description={requirement.text} />
                ))}
          </BaseFlex>
        </div>
        <BaseFlex className={styles.btnWrp}>
          <BaseButton
            className={styles.btn}
            type="default"
            value={t<string>('homePage.fullListOfConditions')}
            onClick={onShowAllRequirements}
          />
        </BaseFlex>
      </BaseFlex>
    </BaseFlex>
  );
};

export default ParticipationConditions;
