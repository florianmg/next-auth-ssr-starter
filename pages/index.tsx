import type { NextPage, GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Home: NextPage = (props) => {
  console.log(props);
  const { t } = useTranslation();
  return (
    <main>
      <h1>Welcome to {t('common:app_name')}</h1>
    </main>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale as string, [
        'common',
        'auth',
      ])),
    },
  };
}

export default Home;
