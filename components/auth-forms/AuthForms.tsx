import React, { useState, useEffect, useCallback } from 'react';

import clx from 'classnames';

import useAuthentification from '../../hooks/useAuthentification';

import Modal from '../modal';
import GoogleAuth from '../google-auth';
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
  const { emailLogin, emailRegister, googleAuth, sendResetPasswordLink } =
    useAuthentification();
  const [currentContentState, setCurrentContentState] = useState(0);
  const [currentContent, setCurrentContent] = useState({
    state: 1,
    btn: '',
    action: (e: React.SyntheticEvent) => {},
    displayResetPasswordLink: false,
  });
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    displayed: false,
    text: '',
  });

  const handleLogin = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      emailLogin(formValues);
    },
    [emailLogin, formValues]
  );

  const handleRegister = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      emailRegister(formValues);
    },
    [emailRegister, formValues]
  );

  const handleResetPassword = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      setIsLoading(true);
      const success = await sendResetPasswordLink(formValues.email);
      if (success) {
        const { email } = formValues;
        const text = `Si l'adresse email éxiste, un email a été envoyé à ${email}`;
        setIsLoading(false);
        setMessage({
          displayed: true,
          text,
        });
      }
    },
    [sendResetPasswordLink, formValues]
  );

  useEffect(() => {
    if (currentContentState === currentContent.state) return;
    switch (currentContentState) {
      case CONTENT_STATE.LOGIN:
        setCurrentContent({
          state: CONTENT_STATE.LOGIN,
          btn: 'Se connecter',
          action: handleLogin,
          displayResetPasswordLink: true,
        });
        break;

      case CONTENT_STATE.REGISTER:
        setCurrentContent({
          state: CONTENT_STATE.REGISTER,
          btn: "S'inscrire",
          action: handleRegister,
          displayResetPasswordLink: false,
        });
        break;
      case CONTENT_STATE.PASSWORD:
        setCurrentContent({
          state: CONTENT_STATE.PASSWORD,
          btn: 'Réinitialiser le mot de passe',
          action: handleResetPassword,
          displayResetPasswordLink: false,
        });
    }
  }, [
    currentContentState,
    handleLogin,
    handleRegister,
    handleResetPassword,
    currentContent,
  ]);

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
          {isLoading ? (
            <div className={styles.loader}>
              <Loader />
            </div>
          ) : (
            <>
              <h3>Bienvenue sut Hâpy</h3>
              {message.displayed && <p>{message.text}</p>}
              <form onSubmit={currentContent.action}>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="text"
                    required
                    value={formValues.email}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        email: e.currentTarget.value,
                      })
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
                  {"< Finalement j'ai retrouvé mon mot de passe !"}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AuthForms;
