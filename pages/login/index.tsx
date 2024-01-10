import { Helmet } from 'react-helmet';
import LogInForm from 'organisms/LogInForm';
import { IProps } from 'interfaces/props';
import MainWrapper from 'molecules/MainWrapper';

interface Props extends IProps {}
const Login: React.FC<Props> = () => {

  return (
    <>
      <Helmet title="Ays Agro | Login" />
      <MainWrapper>
        <LogInForm />
      </MainWrapper>
    </>
  );
};

export default Login;
