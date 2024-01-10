import { Helmet } from 'react-helmet';
import RecoverPasswordForm from 'organisms/RecoverPasswordForm';
import { IProps } from 'interfaces/props';
import MainWrapper from 'molecules/MainWrapper';

interface Props extends IProps {}

const RecoverPassword: React.FC<Props> = () => {
  return (
    <>
      <Helmet title="Ays Agro | Recover Password" />
      <MainWrapper>
        <RecoverPasswordForm />
      </MainWrapper>
    </>
  );
};

export default RecoverPassword;
