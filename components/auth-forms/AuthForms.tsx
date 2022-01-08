import React, { useState, useEffect } from 'react';

import clx from 'classnames';

import useAuthentification from '../../hooks/useAuthentification';

import Modal from '../modal';
import GoogleAuth from '../google-auth';

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
  const { emailLogin, emailRegister, googleAuth, sendResetPasswordLink } =
    useAuthentification();
  const [currentContentState, setCurrentContentState] = useState(0);
  const [currentContent, setCurrentContent] = useState({
    btn: '',
    action: (e: React.SyntheticEvent) => {},
    displayResetPasswordLink: false,
  });
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    emailLogin(formValues);
  };
  const handleRegister = (e: React.SyntheticEvent) => {
    e.preventDefault();
    emailRegister(formValues);
  };
  const handleResetPassword = (e: React.SyntheticEvent) => {
    e.preventDefault();
    sendResetPasswordLink(formValues.email);
  };

  useEffect(() => {
    switch (currentContentState) {
      case CONTENT_STATE.LOGIN:
        setCurrentContent({
          btn: 'Se connecter',
          action: handleLogin,
          displayResetPasswordLink: true,
        });
        break;

      case CONTENT_STATE.REGISTER:
        setCurrentContent({
          btn: "S'inscrire",
          action: handleRegister,
          displayResetPasswordLink: false,
        });
        break;
      case CONTENT_STATE.PASSWORD:
        setCurrentContent({
          btn: 'Réinitialiser le mot de passe',
          action: handleResetPassword,
          displayResetPasswordLink: false,
        });
    }
  }, [currentContentState]);

  useEffect(() => {
    setFormValues((prevState) => {
      return {
        email: prevState.email,
        password: '',
      };
    });
  }, [currentContentState]);

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
          <h3>Bienvenue sut Hâpy</h3>
          <form onSubmit={currentContent.action}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                required
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({ ...formValues, email: e.currentTarget.value })
                }
              />
            </div>
            {currentContentState !== CONTENT_STATE.PASSWORD && (
              <>
                <div>
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={formValues.password}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        password: e.currentTarget.value,
                      })
                    }
                  />
                </div>
                {currentContent.displayResetPasswordLink && (
                  <small
                    onClick={() =>
                      setCurrentContentState(CONTENT_STATE.PASSWORD)
                    }
                  >
                    Mot de passe oublié ?
                  </small>
                )}
              </>
            )}
            <button type="submit">{currentContent.btn}</button>
          </form>

          {currentContentState !== CONTENT_STATE.PASSWORD ? (
            <>
              <hr />
              <GoogleAuth onClick={googleAuth} />
            </>
          ) : (
            <p onClick={() => setCurrentContentState(CONTENT_STATE.LOGIN)}>
              Finalement j&apos;ai retrouvé mon mot de passe !
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AuthForms;
