import React from 'react';
import { Helmet } from 'react-helmet';
import MainWrapper from 'molecules/MainWrapper';
import CreateEditLot from 'organisms/Auctions/CreateEditLot';

interface Props {}

const CreateLotToSell: React.FC<Props> = () => {
  return (
    <>
      <Helmet title="Ays Agro | Sell Lot" />
      <MainWrapper>
        <CreateEditLot type="sell" lotTypeOperation='create' />
      </MainWrapper>
    </>
  );
};

export default CreateLotToSell;
