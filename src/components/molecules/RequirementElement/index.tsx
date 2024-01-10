import { IProps } from 'interfaces/props';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import { FlexDirection } from 'interfaces/flex';
import styles from './index.module.scss';

interface Props extends IProps {
  title: string;
  description: string
}

const RequirementElement: React.FC<Props> = ({ title, description }) => {
  return (
    <BaseFlex className={styles.item} flexDirection={FlexDirection.COLUMN}>
      <BaseTypography className={styles.title} value={title} />
      <BaseTypography className={styles.description} value={description}/>
    </BaseFlex>
  );
};

export default RequirementElement;
