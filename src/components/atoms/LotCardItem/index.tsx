import classNames from 'classnames';
import { IProps } from 'interfaces/props';
import { AlignItems, FlexWrap } from 'interfaces/flex';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import styles from './index.module.scss';

interface Props extends IProps {
  title: string;
  value: string | number;
  classNameTitle?: string;
  classNameValue?: string;
}

const LotCardItem: React.FC<Props> = ({ title, value, classNameTitle, classNameValue, className }) => {
  return (
    <BaseFlex
      className={classNames(styles.contentItem, className)}
      alignItems={AlignItems.CENTER}
      flexWrap={FlexWrap.NOWRAP}
    >
      <BaseTypography value={title} weight="medium" className={classNames(styles.type, classNameTitle)} />
      <BaseTypography value={value} className={classNames(styles.value, classNameValue)} />
    </BaseFlex>
  );
};

export default LotCardItem;
