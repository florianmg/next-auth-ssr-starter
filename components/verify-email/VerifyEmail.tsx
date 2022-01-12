import { useState, useEffect } from 'react';

import useAuthentification from '../../hooks/useAuthentification';

import Loader from '../loader';

interface IVerifyEmailProps {
  oobCode: string;
}

const VerifyEmail: React.FC<IVerifyEmailProps> = ({ oobCode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { verifyEmailValidity } = useAuthentification();

  useEffect(() => {
    (async () => {
      const { success } = await verifyEmailValidity(oobCode);
      if (success) {
        setIsLoading(false);
      }
    })();
  }, [oobCode, verifyEmailValidity]);

  if (isLoading) return <Loader />;
  return <p>Email verified</p>;
};

export default VerifyEmail;
