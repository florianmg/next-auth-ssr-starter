import Link from 'next/link';
import useAuthentification from '../../hooks/useAuthentification';

const LoggedNavigation: React.FC = () => {
  const { logout } = useAuthentification();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </li>
        <li>
          <a onClick={logout}>Se déconnecter</a>
        </li>
      </ul>
    </nav>
  );
};

export default LoggedNavigation;
