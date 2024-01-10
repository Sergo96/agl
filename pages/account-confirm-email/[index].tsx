import { confirmEmail } from 'actions/auth';
import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

const mapDispatchToProps = {
  submitData: (data: string | string[], rounter: NextRouter) => confirmEmail(data, rounter),
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

const EmailVerificationPage: React.FC<Props> = ({ submitData }) => {
  const rounter = useRouter();

  useEffect(() => {
    if (rounter.query.index) {
      submitData(rounter.query.index, rounter);
    }
  }, [rounter.query.index]);

  return <></>;
};

export default connector(EmailVerificationPage);
