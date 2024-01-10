import { JustifyContent } from 'interfaces/flex';
import { IProps } from 'interfaces/props';
import BaseFlex from 'atoms/Flex';
import BaseCopyrightNotice from 'atoms/CopyrightNotice/index';
import FixedBackground from 'atoms/FixedBackground';
import UnauthorizedHeader from 'molecules/UnauthorizedHeader';
import styles from './index.module.scss';

interface Props extends IProps {
  children: JSX.Element[] | JSX.Element;
}
const UnauthorizedWrapper: React.FC<Props> = ({ ...props }) => {
  return (
    <BaseFlex justifyContent={JustifyContent.CENTER} className={styles.root}>
      <FixedBackground />
      <div className={styles.internalWrp}>
        <UnauthorizedHeader />
        {props.children}
        <BaseCopyrightNotice />
      </div>
    </BaseFlex>
  );
};

export default UnauthorizedWrapper;
