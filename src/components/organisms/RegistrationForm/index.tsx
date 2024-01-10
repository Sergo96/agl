import React, { useState, useEffect } from 'react';
import BaseFlex from 'atoms/Flex';
import BaseTypography from 'atoms/Typography';
import SearchNomenclature from 'molecules/SearchNomenclature';
import RegistrationFormStep1 from 'organisms/registration/RegistrationFormStep1';
import RegistrationFormStep2 from 'organisms/registration/RegistrationFormStep2';
import RegistrationFormStep3 from 'organisms/registration/RegistrationFormStep3';
import RegistrationFormStep4 from 'organisms/registration/RegistrationFormStep4';
import RegistrationFormStep5 from 'organisms/registration/RegistrationFormStep5';
import { useTranslation } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { IAysAgroState } from 'store';
import { searchNomenclatureSelector } from 'selectors/search';
import { loadingSearchNomenclature } from 'actions/search';
import { AlignItems, FlexDirection, JustifyContent } from 'interfaces/flex';
import registrationStyles from '../registration/index.module.scss';
import { countryListSelector, ownershipListSelector, statusListSelector } from 'selectors/general';
import { loadingCountryList, loadingOwnershipList, loadingStatusList } from 'actions/general';
import styles from './index.module.scss';
import { useUserIsLogin } from 'hooks/userIsLoggedIn';

const mapStateToProps = (state: IAysAgroState) => {
  return {
    searchData: searchNomenclatureSelector(state),
    countryList: countryListSelector(state),
    ownershipList: ownershipListSelector(state),
    statusList: statusListSelector(state),
    userLogIn: state.auth.userLogIn,
  };
};

const mapDispatchToProps = {
  loadingSearchNomenclature: (data: string) => loadingSearchNomenclature(data),
  loadCountryList: () => loadingCountryList(true),
  loadOwnershipList: () => loadingOwnershipList(),
  loadStatusList: () => loadingStatusList(),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {}

const RegistrationForm: React.FC<Props> = ({
  loadingSearchNomenclature,
  searchData,
  loadCountryList,
  loadOwnershipList,
  loadStatusList,
  countryList,
  ownershipList,
  statusList,
  userLogIn,
}) => {
  const [t] = useTranslation('common');
  const { i18n } = useTranslation('common');

  const [currentStep, setCurrentStep] = useState(0);

  useUserIsLogin(userLogIn);

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };
  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  useEffect(() => {
    loadCountryList();
    loadOwnershipList();
    loadStatusList();
  }, [i18n.language]);

  const steps = [
    {
      stepNumber: 1,
      content: <RegistrationFormStep1 next={next} />,
      title: t('registration.step1Title'),
    },
    {
      stepNumber: 2,
      content: (
        <RegistrationFormStep2 prev={prev} next={next} ownershipList={ownershipList} countryList={countryList} />
      ),
      title: t('registration.step2Title'),
    },
    {
      stepNumber: 3,
      content: <RegistrationFormStep3 prev={prev} next={next} statusList={statusList} />,
      title: t('registration.step3Title'),
    },
    {
      stepNumber: 4,
      content: <RegistrationFormStep4 prev={prev} next={next} />,
      title: t('registration.step4Title'),
    },
    {
      stepNumber: 5,
      content: <RegistrationFormStep5 prev={prev} />,
      title: t('registration.step5Title'),
    },
  ];

  return (
    <div>
      <BaseFlex justifyContent={JustifyContent.SPACE_BETWEEN} alignItems={AlignItems.FLEX_END}>
        <BaseFlex flexDirection={FlexDirection.COLUMN} className={styles.titleWrp}>
          <BaseTypography className={styles.stepNumber} value={`${t('registration.step')} ${currentStep + 1}/5`} />
          <BaseTypography className={styles.title} value={steps[currentStep].title} />
        </BaseFlex>
        {steps[currentStep].stepNumber === 4 && (
          <SearchNomenclature
            placeholder={t('registration.step4.productSearch')}
            searchData={searchData}
            onSearch={loadingSearchNomenclature}
            className={registrationStyles.search}
            size="large"
          />
        )}
      </BaseFlex>
      <div className={styles.stepsContent}>{steps[currentStep].content}</div>
    </div>
  );
};

export default connector(RegistrationForm);
