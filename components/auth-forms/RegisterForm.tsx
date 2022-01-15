import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import ReCAPTCHA from 'react-google-recaptcha';
import InputText from '../input-text';
import ErrorMessage from '../error-message';
import GoogleAuth from '../google-auth';
import Button from '../button';

interface IRegisterFormProps {
  onSubmit: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  onGoogleAuth: () => void;
  error: string;
}

const RegisterForm: React.FC<IRegisterFormProps> = ({
  onSubmit,
  onGoogleAuth,
  error,
}) => {
  const [isCaptchaDisplayed, setIsCaptchaDisplayed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsCaptchaDisplayed(true);
  };

  const handleCaptchaValidate = async () => {
    setIsCaptchaDisplayed(false);
    await onSubmit({
      email,
      password,
    });
  };

  if (isCaptchaDisplayed)
    return (
      <>
        <p>{t('auth:validate_captcha')}</p>
        <ReCAPTCHA
          sitekey={'6Ldo6A0eAAAAAC6uUAfaLVdR0_8xlK9nyTzD0n1Y'}
          onChange={handleCaptchaValidate}
        />
      </>
    );

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
        <Button type="submit" value={t('auth:register_btn')} />
      </form>
      <hr />
      <GoogleAuth onClick={onGoogleAuth} />
    </>
  );
};

export default RegisterForm;
