import '../styles/globals.scss';
import '../styles/reset.css';
import '../styles/variables.scss';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../store/authContext';
import Navbar from '../components/navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
