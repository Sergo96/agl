import React from 'react';
import { Helmet } from 'react-helmet';
import { IProps } from 'interfaces/props';
import MainWrapper from 'molecules/MainWrapper';
import SearchLotsResult from 'organisms/Auctions/SearchLotsResult';

interface Props extends IProps {}

const SearchLot: React.FC<Props> = () => {
  return (
    <>
      <Helmet title="Ays Agro | Auction" />
      <MainWrapper>
        <SearchLotsResult />
      </MainWrapper>
    </>
  );
};

export default SearchLot;
