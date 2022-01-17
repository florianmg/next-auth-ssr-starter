import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import useAuthentification from '../../hooks/useAuthentification';

import Loader from '../loader';
import { AUTH_FORM_STATE } from '../../constants';
import Button from '../button';

interface IVerifyEmailProps {
  oobCode: string;
}

const VerifyEmail: React.FC<IVerifyEmailProps> = ({ oobCode }) => {
  const router = useRouter();
  const { verifyEmailValidity } = useAuthentification();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{
    text: string;
    type: 'error' | 'success' | '';
  }>({ text: '', type: '' });

  const handleEmailVerification = useCallback(async () => {
    if (!isLoading) return;
    const { success, error } = await verifyEmailValidity(oobCode);
    if (success) {
      setIsLoading(false);
      setMessage({
        text: t('auth:verify_email_success'),
        type: 'success',
      });
    } else if (error) {
      setIsLoading(false);
      setMessage({
        text: t(`firebase:errors.${error.code}`),
        type: 'error',
      });
    }
  }, [oobCode, t, verifyEmailValidity, isLoading]);

  useEffect(() => {
    handleEmailVerification();
  }, [handleEmailVerification]);

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
        value={t('auth:go_back_home')}
      />
    </div>
  );
};

export default VerifyEmail;
