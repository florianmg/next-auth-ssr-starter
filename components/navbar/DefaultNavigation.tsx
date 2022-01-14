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
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link href="/">
            <a className="navbar-item">LOGO</a>
          </Link>
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link href="/">
              <a className="navbar-item">{t('common:home')}</a>
            </Link>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button
                  className="button is-primary"
                  onClick={() => setIsAuthFormsOpen(true)}
                >
                  <strong>{t('auth:register')}</strong>
                </button>
                <button
                  className="button is-light"
                  onClick={() => setIsAuthFormsOpen(true)}
                >
                  <strong>{t('auth:login')} </strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default DefaultNavigation;
