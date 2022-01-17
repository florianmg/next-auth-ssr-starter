import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
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
  const { t } = useTranslation();
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
        text: t('auth:reset_password_success'),
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
        <p>{t(`firebase:errors.${message.text}`, 'firebase:errors.generic')}</p>
        <button
          onClick={() => {
            router.push(`/?authform=${AUTH_FORM_STATE.PASSWORD}`);
          }}
        >
          {t('auth:reset_password_again')}
        </button>
      </>
    );
  }

  return (
    <div className="box section hapy-reset-password-form">
      <h3 className="has-text-centered has-text-weight-bold mb-4">
        {t('auth:reset_password')}
      </h3>
      <p className="mb-4">{t('auth:reset_password_helper')}</p>
      <form onSubmit={handleResetPassword}>
        <InputText
          label={t('auth:new_password')}
          type="password"
          required
          value={formValues.password}
          onChange={(newValue: string) =>
            setFormValues({ ...formValues, password: newValue })
          }
        />

        <InputText
          label={t('auth:confirm_password')}
          type="password"
          required
          value={formValues.confirmPassword}
          onChange={(newValue: string) =>
            setFormValues({ ...formValues, confirmPassword: newValue })
          }
        />

        {formValues.password.length > 0 && !isPasswordsIdentical && (
          <div className="notification is-warning is-light">
            <p>{t('auth:different_password')}</p>
          </div>
        )}
        <Button
          type="submit"
          value={t('auth:reset_password_btn_final')}
          disabled={!isPasswordsIdentical || formValues.password.length === 0}
        />
      </form>
    </div>
  );
};

export default ResetPassword;
