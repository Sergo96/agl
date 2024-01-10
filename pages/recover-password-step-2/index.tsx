import { Helmet } from 'react-helmet';
import { IProps } from 'interfaces/props';
import RecoverPasswordFormStep2 from 'organisms/RecoverPasswordFormStep2';

import MainWrapper from 'molecules/MainWrapper';

interface Props extends IProps {}

const RecoverForm2: React.FC<Props> = () => {
  return (
    <>
      <Helmet title="Ays Agro | RecoverFormStep2" />
      <MainWrapper>
        <RecoverPasswordFormStep2 />
      </MainWrapper>
    </>
  );
};

export default RecoverForm2;
