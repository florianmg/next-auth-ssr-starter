import  { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router'

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

import { auth } from '../lib/firebaseClient'
import { useAuth } from './useAuth';

interface IFormValues {
  email: string;
  password: string;
}

interface IUseAuthentificationProps {
  setUser: Dispatch<SetStateAction<User | null>>
}

const useAuthentification = (/*{ setUser }: IUseAuthentificationProps */) => {
  const { setUser } = useAuth();
  const router = useRouter();

  const emailLogin = ({email, password}: IFormValues) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      setUser(result.user);
    })
    .catch((e) => console.log('login error > ', e));
  }

  const emailRegister = ({email, password}: IFormValues) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      setUser(result.user);
    })
    .catch((e) => console.log('register error > ', e));
  }

  const sendResetPasswordLink = (email: string) => {
    sendPasswordResetEmail(auth, email);
  }

  const googleAuth = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((user) => {
        setUser(user.user);
      })
      .then((e) => console.log('google auth error > ', e));
  }

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null);
      router.push('/');
    });
  }

  return {
    emailLogin,
    emailRegister,
    googleAuth,
    sendResetPasswordLink,
    logout,
    
  }
}

export default useAuthentification;

