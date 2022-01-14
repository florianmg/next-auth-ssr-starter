import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import useAuthentification from '../../hooks/useAuthentification';

const LoggedNavigation: React.FC = () => {
  const { logout } = useAuthentification();
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
