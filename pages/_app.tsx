import '../styles/globals.scss';
import '../styles/reset.css';
import '../styles/variables.scss';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../store/authContext';
import Navbar from '../components/navbar';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </AuthProvider>
  );
}

export default MyApp;
