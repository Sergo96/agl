import React from 'react';
import { Helmet } from 'react-helmet';
import { IProps } from 'interfaces/props';
import MainWrapper from 'molecules/MainWrapper';
import AuctionsContent from 'organisms/Auctions';

interface Props extends IProps {}

const Auctions: React.FC<Props> = () => {
  return (
    <>
      <Helmet title="Ays Agro | Auctions" />
      <MainWrapper>
        <AuctionsContent />
      </MainWrapper>
    </>
  );
};

export default Auctions;
