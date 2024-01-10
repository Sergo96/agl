import React from 'react';
import { Helmet } from 'react-helmet';
import { IProps } from 'interfaces/props';
import MainWrapper from 'molecules/MainWrapper';
import CustomCurrentProducts from 'organisms/CustomCurrentProducts';

interface Props extends IProps {}

const Auctions: React.FC<Props> = () => {
  return (
    <>
      <Helmet title="Ays Agro | Auctions" />
      <MainWrapper>
        <CustomCurrentProducts />
      </MainWrapper>
    </>
  );
};

export default Auctions;
