import React, { useEffect } from 'react';
import BaseTypography from 'atoms/Typography';
import { useTranslation } from 'react-i18next';
import LogisticsCompanies from 'molecules/LogisticsCompanies';
import { connect, ConnectedProps } from 'react-redux';
import { IAysAgroState } from 'store';
import { loadingLogistics } from 'actions/logistics';
import { transportCompaniesInfoSelector } from 'selectors/logistics';
import LogisticsMileageCalculator from '../LogisticsMileageCalculator';
import styles from './index.module.scss';

const mapStateToProps = (state: IAysAgroState) => ({
  transportCompaniesInfo: transportCompaniesInfoSelector(state),
});
const mapDispatchToProps = {
  loadDocument: () => loadingLogistics(),
};
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {}

const Logistics: React.FC<Props> = ({ loadDocument, transportCompaniesInfo }) => {
  const [t] = useTranslation('common');

  useEffect(() => {
    loadDocument();
  }, []);

  return (
    <div className={styles.root}>
      <BaseTypography className={styles.title} size="xxl" weight="semi-bold" value={t<string>('logistics.title')} />
      <LogisticsMileageCalculator />
      <LogisticsCompanies transportCompaniesInfo={transportCompaniesInfo} />
    </div>
  );
};

export default connector(Logistics);
