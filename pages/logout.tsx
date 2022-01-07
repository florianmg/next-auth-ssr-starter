import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebaseClient';

const Logout = () => {
  const { setUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    signOut(auth).then(() => {
      setUser(null);
      router.push('/');
    });
  });
  return <p>Login out ...</p>;
};

export default Logout;
