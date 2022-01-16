import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthentification from '../../hooks/useAuthentification';

import Loader from '../loader';
import { AUTH_FORM_STATE } from '../../constants';

interface IVerifyEmailProps {
  oobCode: string;
}

const VerifyEmail: React.FC<IVerifyEmailProps> = ({ oobCode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { verifyEmailValidity } = useAuthentification();

  useEffect(() => {
    (async () => {
      const { success } = await verifyEmailValidity(oobCode);
      if (success) {
        setIsLoading(false);
      }
    })();
  }, [oobCode, verifyEmailValidity]);

  useEffect(() => {
    if (!isLoading) {
      console.log('start timeout');
      const timeout = setTimeout(() => {
        router.push(`/?authform=${AUTH_FORM_STATE.LOGIN}`);
      }, 2500);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isLoading, router]);

  if (isLoading) return <Loader />;
  return <p>Email vérifié, vous allez être redirigé</p>;
};

export default VerifyEmail;
