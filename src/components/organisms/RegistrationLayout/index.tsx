import styles from './index.module.scss';
import BaseFlex from 'atoms/Flex';
import { FlexDirection, JustifyContent } from 'interfaces/flex';
import { IBaseAtomComponentProps } from 'interfaces/props';

interface Props extends IBaseAtomComponentProps {
  children: JSX.Element[] | JSX.Element;
}

const RegistrationLayout: React.FC<Props> = ({ children }: Props) => {
  return (
    <BaseFlex flexDirection={FlexDirection.COLUMN} justifyContent={JustifyContent.CENTER} className={styles.layoutPage}>
      {children}
    </BaseFlex>
  );
};

export default RegistrationLayout;
