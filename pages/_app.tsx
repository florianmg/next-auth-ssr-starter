import '../styles/globals.scss';
import '../styles/reset.css';
import '../styles/variables.scss';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { AuthProvider } from '../store/authContext';
import { Toaster } from 'react-hot-toast';
import CookieConsent from '../components/cookies-consent';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Toaster />
      <CookieConsent />
    </AuthProvider>
  );
}

export default appWithTranslation(MyApp);
