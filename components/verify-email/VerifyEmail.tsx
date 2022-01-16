import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthentification from '../../hooks/useAuthentification';

import Loader from '../loader';
import { AUTH_FORM_STATE } from '../../constants';
import Button from '../button';

interface IVerifyEmailProps {
  oobCode: string;
}

const VerifyEmail: React.FC<IVerifyEmailProps> = ({ oobCode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { verifyEmailValidity } = useAuthentification();
  const [message, setMessage] = useState<{
    text: string;
    type: 'error' | 'success' | '';
  }>({ text: '', type: '' });

  useEffect(() => {
    (async () => {
      const { success, error } = await verifyEmailValidity(oobCode);
      if (success) {
        setMessage({
          text: 'Email vérifié, vous allez être redirigé',
          type: 'success',
        });
      } else {
        setMessage({
          text: error?.code as string,
          type: 'error',
        });
      }

      setIsLoading(false);
    })();
  }, [oobCode, verifyEmailValidity]);

  useEffect(() => {
    if (!isLoading && message.type === 'success') {
      const timeout = setTimeout(() => {
        router.push(`/?authform=${AUTH_FORM_STATE.LOGIN}`);
      }, 2500);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isLoading, router, message]);

  if (isLoading) return <Loader />;
  return (
    <div className="box section">
      <p>{message.text}</p>
      <Button
        onClick={() => {
          router.push('/');
        }}
        className="mt-3"
        type="button"
        value="Retourner a l'accueil"
      />
    </div>
  );
};

export default VerifyEmail;
