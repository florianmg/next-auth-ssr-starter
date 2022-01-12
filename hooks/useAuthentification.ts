import { useRouter } from 'next/router'

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  AuthError,
  sendEmailVerification,
  applyActionCode
} from 'firebase/auth';

import { auth } from '../lib/firebaseClient'
import { useAuth } from './useAuth';

interface IFormValues {
  email: string;
  password: string;
}

const useAuthentification = () => {
  const { setUser } = useAuth();
  const router = useRouter();

  const verifyEmailValidity = async (oobCode: string): Promise<{success: boolean; error?: AuthError}> => {
    return applyActionCode(auth, oobCode)
      .then(() => {
        return {
          success: true
        }
      })
      .catch((error) => {
        return {
          success: false,
          error
        }
      });
  }

  const emailLogin = async ({email, password}: IFormValues): Promise<{success: boolean; error?: AuthError}> => {
    return signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      setUser(result.user);
      return {
        success: true
      }
    })
    .catch((error) => {
      return {
        success: false,
        error
      }
    });
  }

  const emailRegister = async ({email, password}: IFormValues): Promise<{success: boolean; error?: AuthError}>  => {
    return createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      setUser(result.user);
      return sendEmailVerification(result.user).then(() => {
        return {
          success: true
        }
      })
      
    })
    .catch((error) => {  
      
      return {
        success: false,
        error
      }
    });
  }

  const sendResetPasswordLink = async (email: string): Promise<{success: boolean; error?: AuthError}> => {
    return sendPasswordResetEmail(auth, email).then(() => {
      return {
        success: true
      }
    }).catch((error) => {
      return {
        success: false,
        error
      };
    })
  }

  const resetPassword = async ({password, oobCode}: {password: string; oobCode: string}): Promise<{success: boolean; error?: AuthError}> => {
    return confirmPasswordReset(auth, oobCode, password).then(() => {
      return {success: true}
    }).catch((error) => {
      return {success: false, error}
    })
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
    resetPassword,
    verifyEmailValidity,
    logout,
  }
}

export default useAuthentification;

