import React from 'react';
import { Helmet } from 'react-helmet';
import RegistrationLayout from 'organisms/RegistrationLayout';
import MainWrapper from 'molecules/MainWrapper';
import RegistrationSuccessContent from 'organisms/registration/RegistrationSuccess';

const RegistrationPending: React.FC = () => {
  return (
    <>
      <Helmet title="Ays Agro | Registration" />
      <MainWrapper>
        <RegistrationLayout>
          <RegistrationSuccessContent />
        </RegistrationLayout>
      </MainWrapper>
    </>
  );
};

export default RegistrationPending;
