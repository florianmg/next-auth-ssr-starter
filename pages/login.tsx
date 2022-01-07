import { useState } from 'react';

import {
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../lib/firebaseClient';
import { useAuth } from '../hooks/useAuth';

import GoogleAuth from '../components/google-auth';

const Login = () => {
  const { user, setUser } = useAuth();

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleEmailLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { email, password } = formValues;
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log('login success', result);
        setUser(result.user);
      })
      .catch((e) => console.log('login error > ', e));
  };

  return (
    <main>
      <h1>Login page</h1>
      <form onSubmit={handleEmailLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            required
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.currentTarget.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            required
            value={formValues.password}
            onChange={(e) =>
              setFormValues({ ...formValues, password: e.currentTarget.value })
            }
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      <GoogleAuth />
    </main>
  );
};

export default Login;
