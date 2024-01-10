import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useRouter } from 'next/router';
import { IAysAgroState } from 'store';
import { authentication } from 'storage/localStorage';
import { IProps } from 'interfaces/props';
import { userInfo, logOut } from 'actions/auth';
import { isLoginSelector } from 'selectors/auth';
import LayoutPage from 'organisms/LayoutPage';
import AuthorizedWrapper from 'molecules/AuthorizedWrapper';
import UnauthorizedWrapper from 'molecules/UnauthorizedWrapper';
import { checkPages } from 'helpers/auth';
import { footerBaseInfoSelector, headerBaseInfoSelector } from 'selectors/baseInfo';
import { loadingBaseInfo } from 'actions/baseInfo';

const mapStateToProps = (state: IAysAgroState) => {
  return {
    isLogin: isLoginSelector(state),
    baseHeaderInfo: headerBaseInfoSelector(state),
    baseFooterInfo: footerBaseInfoSelector(state),
  };
};

const mapDispatchToProps = {
  userInfo: () => userInfo(),
  loadBaseInfo: () => loadingBaseInfo(),
  logOut: (redirect: () => void) => logOut(redirect)
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends IProps, PropsFromRedux {
  children: JSX.Element[] | JSX.Element;
}

const MainWrapper: React.FC<Props> = ({
  isLogin,
  baseHeaderInfo,
  baseFooterInfo,
  userInfo,
  loadBaseInfo,
  logOut,
  children,
  ...props
}) => {
  const router = useRouter();

  useEffect(() => {
    if (authentication()) {
      userInfo();
      loadBaseInfo();
    }
  }, []);

  useEffect(() => {
    if (checkPages()) {
      if (!isLogin && !authentication()) {
        router.push('/login');
      }
    }
  }, [isLogin]);
  
  
  const redirect = () => {
    router.push('/login');
  };
  const logOutUser = () => {
    logOut(redirect)
  }

  if (isLogin) {
    return (
      <AuthorizedWrapper baseHeaderInfo={baseHeaderInfo} baseFooterInfo={baseFooterInfo} logOut={logOutUser} {...props}>
        <LayoutPage>{children}</LayoutPage>
      </AuthorizedWrapper>
    );
  } else if (!isLogin && authentication() === '') {
    return (
      <UnauthorizedWrapper {...props}>
        <LayoutPage>{children}</LayoutPage>
      </UnauthorizedWrapper>
    );
    // TODO: replace this block with static loader for user feedback till node server loading.
  } else return null;
};

export default connector(MainWrapper);
