import React from 'react';
import { Helmet } from 'react-helmet';
import RegistrationLayout from 'organisms/RegistrationLayout';
import RegistrationForm from 'organisms/RegistrationForm';
import MainWrapper from 'molecules/MainWrapper';

const Registration: React.FC = () => {
  return (
    <>
      <Helmet title="Ays Agro | Registration" />
      <MainWrapper>
        <RegistrationLayout>
          <RegistrationForm />
        </RegistrationLayout>
      </MainWrapper>
    </>
  );
};

export default Registration;
