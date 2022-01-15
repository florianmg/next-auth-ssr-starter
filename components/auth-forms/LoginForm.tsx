import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import InputText from '../input-text';
import Button from '../button';
import ErrorMessage from '../error-message';
import GoogleAuth from '../google-auth';

interface ILoginFormProps {
  onSubmit: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  onForgottenPassword: () => void;
  onGoogleAuth: () => void;
  error: string;
}

const LoginForm: React.FC<ILoginFormProps> = ({
  onSubmit,
  onForgottenPassword,
  onGoogleAuth,
  error,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await onSubmit({
      email,
      password,
    });
  };

  return (
    <>
      <ErrorMessage message={error} />
      <form onSubmit={handleSubmit}>
        <InputText
          label={t('auth:email')}
          type="text"
          required
          value={email}
          onChange={setEmail}
        />
        <InputText
          label={t('auth:password')}
          type="password"
          required
          value={password}
          onChange={setPassword}
        />
        <div className="field is-grouped is-grouped-right">
          <p onClick={onForgottenPassword} className="help">
            <a>{t('auth:forgotten_password')}</a>
          </p>
        </div>

        <Button type="submit" value={t('auth:login_btn')} />
      </form>
      <hr />
      <GoogleAuth onClick={onGoogleAuth} />
    </>
  );
};

export default LoginForm;
