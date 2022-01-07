import '../styles/globals.css';
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
