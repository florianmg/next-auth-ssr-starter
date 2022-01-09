import { useState } from 'react';
import Link from 'next/link';
import AuthForms from '../auth-forms';

const DefaultNavigation = () => {
  const [isAuthFormsOpen, setIsAuthFormsOpen] = useState(false);
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

export default DefaultNavigation;
