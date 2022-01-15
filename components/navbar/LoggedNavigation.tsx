import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import clx from 'classnames';
import useAuthentification from '../../hooks/useAuthentification';

const LoggedNavigation: React.FC = () => {
  const { logout } = useAuthentification();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link href="/">
            <a className="navbar-item">LOGO</a>
          </Link>
          <a
            role="button"
            className={clx('navbar-burger', {
              'is-active': isBurgerOpen,
            })}
            aria-label="menu"
            aria-expanded={isBurgerOpen}
            onClick={() => setIsBurgerOpen((prevState) => !prevState)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="navbarBasicExample"
          className={clx('navbar-menu', {
            'is-active': isBurgerOpen,
          })}
        >
          <div className="navbar-start"></div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link href="/dashboard">
                  <a className="navbar-item">{t('common:dashboard')}</a>
                </Link>
                <a className="navbar-item" onClick={logout}>
                  {t('auth:logout')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LoggedNavigation;
