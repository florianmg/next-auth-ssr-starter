import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';

interface IResetPasswordFormProps {
  onSubmit: (email: string) => void;
  onBack: () => void;
}

const ResetPasswordForm: React.FC<IResetPasswordFormProps> = ({
  onSubmit,
  onBack,
}) => {
  const [email, setEmail] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit(email);
  };

  return (
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
      <button type="submit">{t('auth:reset_password_btn')}</button>
      <p onClick={onBack}>{t('auth:go_back_login')}</p>
    </form>
  );
};

export default ResetPasswordForm;
