import styles from './index.module.scss';
import { IProps } from 'interfaces/props';

interface Props extends IProps {
  value?: string;
}
const FixedBackground: React.FC<Props> = () => {
  return <div className={styles.wrp}></div>;
};

export default FixedBackground;
