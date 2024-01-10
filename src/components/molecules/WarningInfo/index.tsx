import React from 'react';
import BaseTypography from 'atoms/Typography';
import classNames from 'classnames';
import BaseFlex from 'atoms/Flex';
import WarningIcon from 'icons/WarningIcon';
import { IProps } from 'interfaces/props';
import styles from './index.module.scss';

interface Props extends IProps {
  value?: string;
}

const WarningInfo: React.FC<Props> = ({ className, value, ...props }) => {
  return (
    <div className={classNames(styles.wrapper, className)} {...props}>
      <BaseFlex className={styles.info}>
        <div className={styles.warningIcon}>
          <WarningIcon />
        </div>

        <BaseTypography className={styles.text} value={value} />
      </BaseFlex>
    </div>
  );
};

export default WarningInfo;
