import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { auth } from '../lib/firebaseAdmin';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);

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
    return {
      props: { message: `Your email is ${email} and your UID is ${uid}.` },
    };
  }
};

const Dashboard: React.FC<{ message?: string }> = ({ message }) => {
  return <h1>{message}</h1>;
};

export default Dashboard;
