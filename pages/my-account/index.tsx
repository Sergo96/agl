import React from 'react';
import { IProps } from 'interfaces/props';
import MainWrapper from 'molecules/MainWrapper';
import { Helmet } from 'react-helmet';
import MyAccount from 'organisms/MyAccount';

interface Props extends IProps {}

const MyAccountPage: React.FC<Props> = () => {
  return (
    <>
      <Helmet title="Ays Agro | Profile" />
      <MainWrapper>
        <MyAccount />
      </MainWrapper>
    </>
  );
};

export default MyAccountPage;
