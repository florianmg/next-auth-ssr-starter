import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import AuthForms from '../auth-forms';

const DefaultNavigation = () => {
  const router = useRouter();
  const [isAuthFormsOpen, setIsAuthFormsOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!router.query.authform) return;
    setIsAuthFormsOpen(true);
  }, [router.query.authform]);

  return (
    <>
      <AuthForms
        isOpen={isAuthFormsOpen}
        onClose={() => setIsAuthFormsOpen(false)}
      />
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>{t('common:home')}</a>
            </Link>
          </li>
          <li onClick={() => setIsAuthFormsOpen(true)}>
            <p>
              {t('auth:login')} / {t('auth:register')}
            </p>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default DefaultNavigation;
