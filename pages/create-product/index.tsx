import React from 'react';
import { Helmet } from 'react-helmet';
import MainWrapper from 'molecules/MainWrapper';
import CreateCustomCurrentProduct from 'organisms/CustomCurrentProducts/CreateCustomCurrentProduct';

interface Props {}

const CreateProduct: React.FC<Props> = () => {
  return (
    <>
      <Helmet title="Ays Agro | Create Product" />
      <MainWrapper>
        <CreateCustomCurrentProduct lotType='current_item' lotTypeOperation='create' />
      </MainWrapper>
    </>
  );
};

export default CreateProduct;
