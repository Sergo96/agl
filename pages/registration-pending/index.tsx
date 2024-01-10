import React from 'react';
import { Helmet } from 'react-helmet';
import RegistrationLayout from 'organisms/RegistrationLayout';
import MainWrapper from 'molecules/MainWrapper';
import RegistrationPendingContent from 'organisms/registration/RegistrationPending';

const RegistrationPending: React.FC = () => {
  return (
    <>
      <Helmet title="Ays Agro | Registration" />
      <MainWrapper>
        <RegistrationLayout>
          <RegistrationPendingContent />
        </RegistrationLayout>
      </MainWrapper>
    </>
  );
};

export default RegistrationPending;
