import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import clx from 'classnames';

import useAuthentification from '../../hooks/useAuthentification';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ResetPasswordForm from './ResetPasswordForm';
import Modal from '../modal';
import Loader from '../loader';

import styles from './AuthForms.module.scss';

interface IAuthFormsProps {
  isOpen: boolean;
  onClose: () => void;
}

const CONTENT_STATE = {
  LOGIN: 0,
  REGISTER: 1,
  PASSWORD: 2,
};

const AuthForms: React.FC<IAuthFormsProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { emailLogin, emailRegister, googleAuth, sendResetPasswordLink } =
    useAuthentification();

  const [currentContentState, setCurrentContentState] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [currentContentState]);

  const handleResetPasswordLink = async (email: string) => {
    setIsLoading(true);
    const { success, error } = await sendResetPasswordLink(email);
    if (success) {
      setIsLoading(false);
      setCurrentContentState(CONTENT_STATE.LOGIN);
    } else {
      setIsLoading(false);
      const errorCode = error?.code;
      setError(t(`firebase:errors.${errorCode}`, 'firebase:errors.generic'));
    }
  };

  const handleEmailLogin = async (formValues: {
    email: string;
    password: string;
  }) => {
    const { success, error } = await emailLogin(formValues);
    if (success) {
      router.push('/dashboard');
    } else {
      const errorCode = error?.code;
      setError(t(`firebase:errors.${errorCode}`, 'firebase:errors.generic'));
    }
  };

  const handleEmailRegister = async (formValues: {
    email: string;
    password: string;
  }) => {
    const { success, error } = await emailRegister(formValues);
    if (success) {
      router.push('/dashboard');
    } else {
      const errorCode = error?.code;
      setError(t(`firebase:errors.${errorCode}`, 'firebase:errors.generic'));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth={500}>
      <div className={styles.container}>
        <div className={styles.header}>
          {currentContentState !== CONTENT_STATE.PASSWORD ? (
            <>
              <div
                className={clx(styles.btn, {
                  [styles.selected]:
                    currentContentState === CONTENT_STATE.LOGIN,
                })}
                onClick={() => setCurrentContentState(CONTENT_STATE.LOGIN)}
              >
                {t('auth:login')}
              </div>
              <div
                className={clx(styles.btn, {
                  [styles.selected]:
                    currentContentState === CONTENT_STATE.REGISTER,
                })}
                onClick={() => setCurrentContentState(CONTENT_STATE.REGISTER)}
              >
                {t('auth:register')}
              </div>
            </>
          ) : (
            <div className={styles.title}>{t('auth:reset_password')}</div>
          )}
        </div>
        <div className={styles.content}>
          {isLoading ? (
            <Loader />
          ) : currentContentState === CONTENT_STATE.LOGIN ? (
            <LoginForm
              onSubmit={handleEmailLogin}
              onGoogleAuth={googleAuth}
              onForgottenPassword={() =>
                setCurrentContentState(CONTENT_STATE.PASSWORD)
              }
              error={error}
            />
          ) : currentContentState === CONTENT_STATE.REGISTER ? (
            <RegisterForm
              error={error}
              onSubmit={handleEmailRegister}
              onGoogleAuth={googleAuth}
            />
          ) : currentContentState === CONTENT_STATE.PASSWORD ? (
            <ResetPasswordForm
              onSubmit={handleResetPasswordLink}
              onBack={() => setCurrentContentState(CONTENT_STATE.LOGIN)}
              error={error}
            />
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default AuthForms;
