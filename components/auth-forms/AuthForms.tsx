import React, { useState, useEffect, useCallback } from 'react';

import clx from 'classnames';

import useAuthentification from '../../hooks/useAuthentification';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ResetPasswordForm from './ResetPasswordForm';
import Modal from '../modal';
import Loader from '../loader';

import styles from './AuthForms.module.scss';
import { emit } from 'process';

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
  const { emailLogin, emailRegister, googleAuth, sendResetPasswordLink } =
    useAuthentification();

  const [currentContentState, setCurrentContentState] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPasswordLink = async (email: string) => {
    setIsLoading(true);
    const success = await sendResetPasswordLink(email);
    if (success) {
      setIsLoading(false);
      setCurrentContentState(CONTENT_STATE.LOGIN);
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
                Connexion
              </div>
              <div
                className={clx(styles.btn, {
                  [styles.selected]:
                    currentContentState === CONTENT_STATE.REGISTER,
                })}
                onClick={() => setCurrentContentState(CONTENT_STATE.REGISTER)}
              >
                Inscription
              </div>
            </>
          ) : (
            <div className={styles.title}>Réinitialiser mot de passe</div>
          )}
        </div>
        <div className={styles.content}>
          {isLoading ? (
            <Loader />
          ) : currentContentState === CONTENT_STATE.LOGIN ? (
            <LoginForm
              onSubmit={(formValues) => emailLogin(formValues)}
              onGoogleAuth={googleAuth}
              onForgottenPassword={() =>
                setCurrentContentState(CONTENT_STATE.PASSWORD)
              }
            />
          ) : currentContentState === CONTENT_STATE.REGISTER ? (
            <RegisterForm
              onSubmit={(formValues) => emailRegister(formValues)}
              onGoogleAuth={googleAuth}
            />
          ) : currentContentState === CONTENT_STATE.PASSWORD ? (
            <ResetPasswordForm
              onSubmit={handleResetPasswordLink}
              onBack={() => setCurrentContentState(CONTENT_STATE.LOGIN)}
            />
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default AuthForms;
