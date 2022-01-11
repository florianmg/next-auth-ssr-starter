import type { NextPage, GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Navbar from '../components/navbar';

const Home: NextPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <main>
        <h1>Welcome to {t('common:app_name')}</h1>
      </main>
    </>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale as string, [
        'common',
        'auth',
        'firebase',
      ])),
    },
  };
}

export default Home;
