import React from 'react';
import BaseFlex from 'atoms/Flex';
import Footer from 'organisms/Footer';
import AuthorizedHeader from 'molecules/AuthorizedHeader';
import { JustifyContent } from 'interfaces/flex';
import { IProps } from 'interfaces/props';
import FixedProfileBackground from 'atoms/FixedProfileBackground';
import styles from './index.module.scss';
import { IFooterBaseInfo, IHeaderBaseInfo } from 'interfaces/baseInfo';

interface Props extends IProps {
  children: JSX.Element[] | JSX.Element;
  baseHeaderInfo?: IHeaderBaseInfo;
  baseFooterInfo?: IFooterBaseInfo;
  logOut: () => void
}
const AuthorizedWrapper: React.FC<Props> = ({ baseHeaderInfo, baseFooterInfo, logOut, ...props }) => {
  return (
    <BaseFlex justifyContent={JustifyContent.CENTER} className={styles.root}>
      <FixedProfileBackground />
      <div className={styles.internalWrp}>
        <AuthorizedHeader baseHeaderInfo={baseHeaderInfo} logOut={logOut} />
        {props.children}
        <Footer baseFooterInfo={baseFooterInfo} />
      </div>
    </BaseFlex>
  );
};

export default AuthorizedWrapper;
