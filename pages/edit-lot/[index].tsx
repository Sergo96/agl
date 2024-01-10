import React from 'react';
import { Helmet } from 'react-helmet';
import MainWrapper from 'molecules/MainWrapper';
import CreateEditLot from 'organisms/Auctions/CreateEditLot';

interface Props {}

const EditLot: React.FC<Props> = () => {
  return (
    <>
      <Helmet title="Ays Agro | Edit Lot" />
      <MainWrapper>
        <CreateEditLot lotTypeOperation='edit' />
      </MainWrapper>
    </>
  );
};

export default EditLot;
