import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';

import Button from '../button';
import ErrorMessage from '../error-message';
import InputText from '../input-text';

interface IResetPasswordFormProps {
  onSubmit: (email: string) => void;
  onBack: () => void;
  error: string;
}

const ResetPasswordForm: React.FC<IResetPasswordFormProps> = ({
  onSubmit,
  onBack,
  error,
}) => {
  const [email, setEmail] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit(email);
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
        <Button type="submit" value={t('auth:reset_password_btn')} />
        <p onClick={onBack}>
          <a>{t('auth:go_back_login')}</a>
        </p>
      </form>
    </>
  );
};

export default ResetPasswordForm;
