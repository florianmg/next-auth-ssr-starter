import { useState, useEffect } from 'react';

const ResetPassword: React.FC = () => {
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

  const resetPassword = () => {};

  return (
    <div>
      <h3>Réinitialiser le mot de passe</h3>
      <form>
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
        <button type="submit">Changer le mot de passe</button>
      </form>
    </div>
  );
};

export default ResetPassword;
