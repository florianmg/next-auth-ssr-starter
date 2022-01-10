import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { auth } from '../lib/firebaseAdmin';
import Navbar from '../components/navbar';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = nookies.get(context);

  if (!cookies.token) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {},
    };
  } else {
    // verify user token validity
    const token = await auth.verifyIdToken(cookies.token);

    // the user is authenticated!
    const { uid, email } = token;

    // FETCH STUFF HERE!! 🚀

    // Get translations

    return {
      props: {
        ...(await serverSideTranslations(context.locale as string, [
          'common',
          'auth',
        ])),
        message: `Hello, your email adress is ${email} and your uid is ${uid} `,
      },
    };
  }
};

const Dashboard: React.FC<{ message?: string }> = ({ message }) => {
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <main>
        <h1>
          The app name is {t('common:app_name')}
          <br />
          {message}
        </h1>
      </main>
    </>
  );
  // return <h1>{message}</h1>;
};

export default Dashboard;
