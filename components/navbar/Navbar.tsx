import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { auth } from '../../lib/firebaseClient';

const Navbar: React.FC = () => {
  const { user } = useAuth();
  return (
    <nav>
      {user !== null ? (
        <>
          <ul>
            <p>{user.email}</p>
            <li>
              <Link href="/dashboard">
                <a>dashboard</a>
              </Link>
            </li>
            <li>
              <Link href="/logout">
                <a>logout</a>
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <a>login</a>
            </Link>
          </li>
          <li>
            <Link href="/register">
              <a>register</a>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
