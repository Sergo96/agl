import React, { useEffect, useState } from 'react';
import BaseFlex from 'atoms/Flex';
import { AlignSelf } from 'interfaces/flex';
import { IAysAgroState } from 'store';
import { currentTariffInfoSelector, tariffsInfoSelector } from 'selectors/subscriptions';
import { buySubscription, loadingCurrentTariffInfo, loadingTariffsInfo } from 'actions/subscriptions';
import { connect, ConnectedProps } from 'react-redux';
import CreditCardPayment from 'organisms/CreditCardPayment';
import styles from './index.module.scss';
import { IPostPaymentMethod } from 'interfaces/subscriptions';
import SubscriptionPlans from '../SubscriptionPlans';
import SubscriptionPayment from '../SubscriptionPayment';

const mapStateToProps = (state: IAysAgroState) => ({
  tariffsInfo: tariffsInfoSelector(state),
  currentTariffInfo: currentTariffInfoSelector(state),
});

const mapDispatchToProps = {
  loadTariffsInfo: () => loadingTariffsInfo(),
  loadCurrentTariffInfo: () => loadingCurrentTariffInfo(),
  buySubscription: (data: IPostPaymentMethod, notification: string) => buySubscription(data, notification),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {}

const Subscriptions: React.FC<Props> = ({
  tariffsInfo,
  currentTariffInfo,
  loadTariffsInfo,
  loadCurrentTariffInfo,
  buySubscription,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tariffId, setTariffId] = useState(0);

  useEffect(() => {
    loadTariffsInfo();
    loadCurrentTariffInfo();
  }, []);

  const previousStep = () => {
    setCurrentStep(currentStep - 1);
  };
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const selectPlan = (tariffId: number) => {
    setTariffId(tariffId);
    nextStep();
  };
  const steps = [
    {
      stepNumber: 1,
      content: (
        <SubscriptionPlans tariffsInfo={tariffsInfo} currentTariffInfo={currentTariffInfo} selectPlan={selectPlan} />
      ),
    },
    {
      stepNumber: 2,
      content: <SubscriptionPayment previousStep={previousStep} nextStep={nextStep} />,
    },
    {
      stepNumber: 3,
      content: <CreditCardPayment tariffId={tariffId} previousStep={previousStep} buySubscription={buySubscription} />,
    },
  ];

  return (
    <BaseFlex className={styles.root} alignSelf={AlignSelf.CENTER}>
      {steps[currentStep].content}
    </BaseFlex>
  );
};
export default connector(Subscriptions);
