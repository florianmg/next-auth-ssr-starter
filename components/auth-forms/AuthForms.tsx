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

import { AUTH_FORM_STATE } from '../../constants';

import styles from './AuthForms.module.scss';

interface IAuthFormsProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthForms: React.FC<IAuthFormsProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { emailLogin, emailRegister, googleAuth, sendResetPasswordLink } =
    useAuthentification();

  const [currentContentState, setCurrentContentState] = useState(
    AUTH_FORM_STATE.LOGIN
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!router.query.authform) return;

    const nextContentState = parseInt(router.query.authform as string, 10);
    setCurrentContentState(nextContentState);
  }, [router.query.authform]);

  useEffect(() => {
    setError('');
  }, [currentContentState]);

  const handleResetPasswordLink = async (email: string) => {
    setIsLoading(true);
    const { success, error } = await sendResetPasswordLink(email);
    if (success) {
      setIsLoading(false);
      setCurrentContentState(AUTH_FORM_STATE.LOGIN);
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
          {currentContentState !== AUTH_FORM_STATE.PASSWORD ? (
            <>
              <div
                className={clx(styles.btn, {
                  [styles.selected]:
                    currentContentState === AUTH_FORM_STATE.LOGIN,
                })}
                onClick={() => setCurrentContentState(AUTH_FORM_STATE.LOGIN)}
              >
                {t('auth:login')}
              </div>
              <div
                className={clx(styles.btn, {
                  [styles.selected]:
                    currentContentState === AUTH_FORM_STATE.REGISTER,
                })}
                onClick={() => setCurrentContentState(AUTH_FORM_STATE.REGISTER)}
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
          ) : currentContentState === AUTH_FORM_STATE.LOGIN ? (
            <LoginForm
              onSubmit={handleEmailLogin}
              onGoogleAuth={googleAuth}
              onForgottenPassword={() =>
                setCurrentContentState(AUTH_FORM_STATE.PASSWORD)
              }
              error={error}
            />
          ) : currentContentState === AUTH_FORM_STATE.REGISTER ? (
            <RegisterForm
              error={error}
              onSubmit={handleEmailRegister}
              onGoogleAuth={googleAuth}
            />
          ) : currentContentState === AUTH_FORM_STATE.PASSWORD ? (
            <ResetPasswordForm
              onSubmit={handleResetPasswordLink}
              onBack={() => setCurrentContentState(AUTH_FORM_STATE.LOGIN)}
              error={error}
            />
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default AuthForms;
