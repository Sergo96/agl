import React from 'react';
import { Helmet } from 'react-helmet';
import { IProps } from 'interfaces/props';
import MainWrapper from 'molecules/MainWrapper';
import CurrentLot from 'organisms/Auctions/CurrentLot';

interface Props extends IProps {}

const Lot: React.FC<Props> = () => {
  return (
    <>
      <Helmet title="Ays Agro | Auction" />
      <MainWrapper>
        <CurrentLot />
      </MainWrapper>
    </>
  );
};

export default Lot;
