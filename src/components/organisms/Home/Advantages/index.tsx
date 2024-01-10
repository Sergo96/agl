import { JustifyContent } from 'interfaces/flex';
import { useTranslation } from 'react-i18next';
import { IProps } from 'interfaces/props';
import { IAdvantages } from 'interfaces/homePage';
import AdvantagesItem from 'molecules/AdvantagesItem'
import HomePageTitle from 'molecules/HomePageTitle';
import BaseFlex from 'atoms/Flex';
import styles from './index.module.scss';

interface Props extends IProps {
  advantages: IAdvantages[]
}

const Advantages: React.FC<Props> = ({advantages}) => {
  const [t] = useTranslation('common');

  return (
      <BaseFlex className={styles.mainWrp} justifyContent={JustifyContent.CENTER}>
        <BaseFlex className={styles.advantagesWrp}>
        <HomePageTitle className={styles.title} value={t('homePage.ourAdvantages')} />
        <BaseFlex>
          {advantages.map((advantage: IAdvantages) => (
            <AdvantagesItem key={advantage.number} className={styles.item} alt={'agron24'} icon={advantage.image} value={advantage.text} />
          ))}
        </BaseFlex>
        </BaseFlex>
      </BaseFlex>

  );
};

export default Advantages;
