import React from 'react';
import { Helmet } from 'react-helmet';
import { IProps } from 'interfaces/props';
import HomeContent from 'organisms/Home';
import MainWrapper from 'molecules/MainWrapper';

interface Props extends IProps {}

const Home: React.FC<Props> = () => {
  return (
    <>
      <Helmet title="Ays Agro | Home" />
      <MainWrapper>
        <HomeContent />
      </MainWrapper>
    </>
  );
};

export default Home;
