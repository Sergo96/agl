import { IProps } from 'interfaces/props';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import { FlexDirection, AlignItems, FlexWrap } from 'interfaces/flex';
import styles from './index.module.scss';
import classNames from 'classnames';

interface Props extends IProps {
  value: string;
  icon: string;
  alt: string;
}

const AdvantagesItem: React.FC<Props> = ({ value, icon, alt, className }) => {
  return (
    <BaseFlex
      className={classNames(styles.advantagesItem, className)}
      flexDirection={FlexDirection.ROW}
      alignItems={AlignItems.CENTER}
    >
      <BaseFlex className={styles.wrp} flexWrap={FlexWrap.NOWRAP} alignItems={AlignItems.CENTER}>
        <img className={styles.advantagesIcon} alt={alt} src={icon} />
        <BaseTypography value={value} className={styles.title} />
      </BaseFlex>
    </BaseFlex>
  );
};

export default AdvantagesItem;
