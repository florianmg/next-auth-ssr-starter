import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import useAuthentification from '../../hooks/useAuthentification';

import Loader from '../loader';
import InputText from '../input-text';
import Button from '../button';

import { AUTH_FORM_STATE } from '../../constants';

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
    if (message.type === 'success') {
      const timeout = setTimeout(() => {
        router.push(`/?authform=${AUTH_FORM_STATE.LOGIN}`);
      }, 3500);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [message, router]);

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
        text: 'Votre mot de passe a bien été modifié, vous allez être redirigé vers la page de connexion.',
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
      <div className="notification is-info">
        <p>{message.text}</p>
      </div>
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
    <div className="box section hapy-reset-password-form">
      <h3 className="has-text-centered has-text-weight-bold mb-4">
        Réinitialiser le mot de passe
      </h3>
      <p className="mb-4">
        Entrez votre nouveau mot de passe puis valider pour terminer la
        modification
      </p>
      <form onSubmit={handleResetPassword}>
        <InputText
          label={'Nouveau mot de passe '}
          type="password"
          required
          value={formValues.password}
          onChange={(newValue: string) =>
            setFormValues({ ...formValues, password: newValue })
          }
        />

        <InputText
          label={'Confirmer le mot de passe'}
          type="password"
          required
          value={formValues.confirmPassword}
          onChange={(newValue: string) =>
            setFormValues({ ...formValues, confirmPassword: newValue })
          }
        />

        {formValues.password.length > 0 && !isPasswordsIdentical && (
          <div className="notification is-warning is-light">
            <p>Les mots de passe ne sont pas identiques</p>
          </div>
        )}
        <Button
          type="submit"
          value="Changer le mot de passe"
          disabled={!isPasswordsIdentical || formValues.password.length === 0}
        />
      </form>
    </div>
  );
};

export default ResetPassword;
