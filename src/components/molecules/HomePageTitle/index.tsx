import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import { IProps } from 'interfaces/props';
import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

interface Props extends IProps {
  value: string
}
const HomePageTitle: React.FC<Props> = ({ value, className }) => {

  return (
    <BaseFlex className={classNames(styles.root, className)}>
      <BaseTypography as="h2" className={styles.title} value={value}/>
    </BaseFlex>
  );
};

export default HomePageTitle;
