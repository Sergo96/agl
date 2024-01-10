import styles from './index.module.scss';
import { IProps } from 'interfaces/props';

interface Props extends IProps {}

const FixedProfileBackground: React.FC<Props> = () => {
  return <div className={styles.wrp}></div>;
};

export default FixedProfileBackground;
