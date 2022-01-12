import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthentification from '../../hooks/useAuthentification';
import Loader from '../loader';
import { AUTH_FORM_STATE } from '../../constants';

import styles from './ResetPassword.module.scss';

interface IResetPasswordProps {
  oobCode: string;
}

const ResetPassword: React.FC<IResetPasswordProps> = ({ oobCode }) => {
  const router = useRouter();
  const { resetPassword } = useAuthentification();
  const [formValues, setFormValues] = useState({
    password: '',
    confirmPassword: '',
  });
  const [isPasswordsIdentical, setIsPasswordIdentical] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: 'error' | 'success' | '';
  }>({ text: '', type: '' });

  useEffect(() => {
    if (formValues.password === formValues.confirmPassword) {
      setIsPasswordIdentical(true);
    } else {
      setIsPasswordIdentical(false);
    }
  }, [formValues]);

  const handleResetPassword = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const { success, error } = await resetPassword({
      password: formValues.password,
      oobCode,
    });

    if (success) {
      setIsLoading(false);
      setMessage({
        text: 'Votre mot de passe a bien été modifié, vous pouvez quitter la page.',
        type: 'success',
      });
    } else if (error) {
      setIsLoading(false);
      setMessage({
        text: error.code,
        type: 'error',
      });
    }
  };

  if (isLoading) return <Loader />;

  if (message.type === 'success') {
    return (
      <>
        <p>{message.text}</p>
        <button
          onClick={() => {
            router.push(`/?authform=${AUTH_FORM_STATE.LOGIN}`);
          }}
        >
          Me connecter
        </button>
      </>
    );
  }

  if (message.type === 'error') {
    return (
      <>
        <p>{message.text}</p>
        <button
          onClick={() => {
            router.push(`/?authform=${AUTH_FORM_STATE.PASSWORD}`);
          }}
        >
          Refaire une demande de mot de passe
        </button>
      </>
    );
  }

  return (
    <div>
      <h3>Réinitialiser le mot de passe</h3>
      <form onSubmit={handleResetPassword}>
        <div>
          <label htmlFor="password">Nouveau mot de passe</label>
          <input
            id="password"
            type="password"
            value={formValues.password}
            onChange={(e) =>
              setFormValues({ ...formValues, password: e.currentTarget.value })
            }
          />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirmer le mot de passe</label>
          <input
            id="confirm-password"
            type="password"
            value={formValues.confirmPassword}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                confirmPassword: e.currentTarget.value,
              })
            }
          />
        </div>
        {formValues.password.length > 0 && !isPasswordsIdentical && (
          <p>Les mots de passe ne sont pas identiques</p>
        )}
        <button
          disabled={!isPasswordsIdentical || formValues.password.length === 0}
          type="submit"
        >
          Changer le mot de passe
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
