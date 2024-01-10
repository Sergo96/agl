import React from 'react';
import { Helmet } from 'react-helmet';
import MainWrapper from 'molecules/MainWrapper';
import CreateEditLot from 'organisms/Auctions/CreateEditLot';

interface Props {}

const CreateLotToBuy: React.FC<Props> = () => {
  return (
    <>
      <Helmet title="Ays Agro | Buy Lot" />
      <MainWrapper>
        <CreateEditLot type="buy" lotTypeOperation='create' />
      </MainWrapper>
    </>
  );
};

export default CreateLotToBuy;
