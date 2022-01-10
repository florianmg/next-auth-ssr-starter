import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import useAuthentification from '../../hooks/useAuthentification';

const LoggedNavigation: React.FC = () => {
  const { logout } = useAuthentification();
  const { t } = useTranslation();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </li>
        <li>
          <a onClick={logout}>{t('auth:logout')}</a>
        </li>
      </ul>
    </nav>
  );
};

export default LoggedNavigation;
