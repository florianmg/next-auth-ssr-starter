import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';

import Button from '../button';
import ErrorMessage from '../error-message';
import InputText from '../input-text';
import SuccessMessage from '../success-message';

interface IResetPasswordFormProps {
  onSubmit: (email: string) => Promise<void>;
  onBack: () => void;
  error: string;
  message: string;
}

const ResetPasswordForm: React.FC<IResetPasswordFormProps> = ({
  onSubmit,
  onBack,
  error,
  message,
}) => {
  const [email, setEmail] = useState('');
  const { t } = useTranslation();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await onSubmit(email);
  };

  return (
    <>
      <ErrorMessage message={error} />
      <SuccessMessage message={message} />
      <form onSubmit={handleSubmit}>
        <InputText
          label={t('auth:email')}
          type="text"
          required
          value={email}
          onChange={setEmail}
        />
        <Button type="submit" value={t('auth:reset_password_btn')} />
        <p onClick={onBack}>
          <a>{t('auth:go_back_login')}</a>
        </p>
      </form>
    </>
  );
};

export default ResetPasswordForm;
