import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthentification from '../hooks/useAuthentification';

const ResetPassword: React.FC = () => {
  const { resetPassword } = useAuthentification();
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    password: '',
    confirmPassword: '',
  });

  const [isPasswordsIdentical, setIsPasswordIdentical] = useState(true);

  useEffect(() => {
    if (formValues.password === formValues.confirmPassword) {
      setIsPasswordIdentical(true);
    } else {
      setIsPasswordIdentical(false);
    }
  }, [formValues]);

  const handleResetPassword = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { oobCode } = router.query;
    const { password } = formValues;

    const { success } = await resetPassword({
      password,
      oobCode: oobCode as string,
    });

    if (success) {
      router.push('/');
    }
  };

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
        {formValues.password.length > 0 && isPasswordsIdentical ? (
          <p>Les mot de passe sont les mêmes</p>
        ) : formValues.password.length > 0 ? (
          <p>Les mots de passe ne sont pas identiques</p>
        ) : null}
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
