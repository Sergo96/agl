import { FlexDirection, JustifyContent } from 'interfaces/flex';
import { IBaseAtomComponentProps } from 'interfaces/props';
import BaseFlex from 'atoms/Flex';
import Notifications from 'organisms/Notifications';
import styles from './index.module.scss';

interface Props extends IBaseAtomComponentProps {
  children: JSX.Element[] | JSX.Element;
}

const LayoutPage: React.FC<Props> = ({ children }: Props) => {
  return (
    <BaseFlex flexDirection={FlexDirection.COLUMN} justifyContent={JustifyContent.CENTER} className={styles.layoutPage}>
      {children}
      <Notifications />
    </BaseFlex>
  );
};

export default LayoutPage;
