import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale as string, [
        'common',
        'auth',
      ])),
    },
  };
};

const Action: React.FC = () => {
  return (
    <main>
      <h1>Action page</h1>
    </main>
  );
};

export default Action;
