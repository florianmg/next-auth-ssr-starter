import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import GoogleAuth from '../google-auth';

interface IRegisterFormProps {
  onSubmit: ({ email, password }: { email: string; password: string }) => void;
  onGoogleAuth: () => void;
}

const RegisterForm: React.FC<IRegisterFormProps> = ({
  onSubmit,
  onGoogleAuth,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      email,
      password,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">{t('auth:email')}</label>
          <input
            id="email"
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div>
          <label htmlFor="password">{t('auth:password')}</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <button type="submit">{t('auth:register_btn')}</button>
      </form>
      <hr />
      <GoogleAuth onClick={onGoogleAuth} />
    </>
  );
};

export default RegisterForm;
