import { Helmet } from 'react-helmet';
import NewPasswordForm from 'organisms/NewPasswordForm';
import { IProps } from 'interfaces/props';
import MainWrapper from 'molecules/MainWrapper';

interface Props extends IProps { }

const NewPassword: React.FC<Props> = () => {
  return (
    <>
      <Helmet title="Ays Agro | New Password" />
      <MainWrapper>
        <NewPasswordForm />
      </MainWrapper>   
    </>
  );
}

export default  NewPassword
