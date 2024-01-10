import styles from './index.module.scss';
import { IProps } from 'interfaces/props';

interface Props extends IProps {
  value: string | undefined;
}

const ErrorMessage: React.FC<Props> = ({ value }) => {
  return (
    <div className={styles.title}>
      <p> {value}</p>
    </div>
  );
};

export default ErrorMessage;
