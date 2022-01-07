import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { useAuth } from '../../hooks/useAuth';
import { auth } from '../../lib/firebaseClient';

const GoogleAuth: React.FC = () => {
  const { setUser } = useAuth();
  const handleGoogleAuth = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((user) => {
        setUser(user.user);
      })
      .then((e) => console.log('google auth error > ', e));
  };
  return (
    <div role="button" onClick={handleGoogleAuth}>
      Continuer avec Google
    </div>
  );
};

export default GoogleAuth;
