import React from 'react';
import { Helmet } from 'react-helmet';
import { IProps } from 'interfaces/props';
import MainWrapper from 'molecules/MainWrapper';
import Logistics from 'organisms/logistics/Logistics';

interface Props extends IProps {}
const logistics: React.FC<Props> = () => {
  return (
    <>
      <Helmet title="Ays Agro | Logistics" />
      <MainWrapper>
        <Logistics />
      </MainWrapper>
    </>
  );
};

export default logistics;
