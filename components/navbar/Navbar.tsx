import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import AuthForms from '../auth-forms/AuthForms';

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const [isAuthFormsOpen, setIsAuthFormsOpen] = useState(true);
  return user !== null ? (
    <nav>
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
    </nav>
  ) : (
    <>
      <AuthForms
        isOpen={isAuthFormsOpen}
        onClose={() => setIsAuthFormsOpen(false)}
      />
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li onClick={() => setIsAuthFormsOpen(true)}>
            <p>login / register</p>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
