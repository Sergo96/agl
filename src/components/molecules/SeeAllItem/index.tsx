import classNames from 'classnames';
import { IProps } from 'interfaces/props';
import { FlexDirection, JustifyContent } from 'interfaces/flex';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import styles from './index.module.scss';
import Arrow from 'icons/Arrow';
import BaseButton from 'atoms/Button';

interface Props extends IProps {
  title: string;
  showAllItems: () => void;
}

const SeeAllItem: React.FC<Props> = ({ className, title,  showAllItems}) => {
  return (
    <BaseFlex
      className={classNames(styles.itemWrp, className)}
      justifyContent={JustifyContent.SPACE_BETWEEN}
      flexDirection={FlexDirection.COLUMN}
    >
      <BaseTypography className={styles.title} value={title} />
      <BaseButton className={styles.arrowBtn} onClick={showAllItems} icon={ <Arrow />}>
      </BaseButton>
    </BaseFlex>
  );
};

export default SeeAllItem;
