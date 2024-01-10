import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { RightOutlined } from '@ant-design/icons';
import BaseButton from 'atoms/Button';
import BaseFlex from 'atoms/Flex';
import UserTradeTypeRegistrationField from 'molecules/UserTypeRegistrationField';
import WarningInfo from 'molecules/WarningInfo';
import { IAysAgroState } from 'store';
import { updateRegistrationInfo } from 'actions/auth';
import { userRegInfoSelector } from 'selectors/auth';
import { IRegistrationDataStep1 } from 'interfaces/auth';
import { FlexDirection, JustifyContent } from 'interfaces/flex';
import styles from './index.module.scss';
import registrationStyles from '../index.module.scss';

const mapDispatchToProps = {
  submitData: (data: IRegistrationDataStep1) => updateRegistrationInfo(data),
};
const mapStateToProps = (state: IAysAgroState) => ({
  regInfo: userRegInfoSelector(state),
});
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {
  next: () => void;
}
const RegistrationFormStep1: React.FC<Props> = ({ submitData, regInfo, next }) => {
  const [t] = useTranslation('common');
  const validationSchema = Yup.object().shape({
    company: Yup.object({
      trade_type: Yup.string().required('Trader type is required'),
    }),
  });

  const defaultValues: IRegistrationDataStep1 = {
    company: {
      trade_type: regInfo.company?.trade_type,
    },
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegistrationDataStep1>({ defaultValues, resolver: yupResolver(validationSchema) });

  const onSubmit = (data: IRegistrationDataStep1) => {
    const updatedAuthState = {
      ...regInfo,
      ...data,
    };
    next();
    submitData(updatedAuthState);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <UserTradeTypeRegistrationField control={control} errors={errors} />
      <WarningInfo className={styles.info} value={t<string>('registration.step1.warning')} />
      <BaseFlex
        justifyContent={JustifyContent.SPACE_BETWEEN}
        flexDirection={FlexDirection.ROW}
        className={registrationStyles.stepsAction}
      >
        <BaseButton
          className={registrationStyles.btnNext}
          icon={<RightOutlined />}
          type="primary"
          value={t<string>('registration.navigation.nextStep')}
        />
      </BaseFlex>
    </form>
  );
};
export default connector(RegistrationFormStep1);
