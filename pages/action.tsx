import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import ResetPasswordForm from '../components/reset-password';
import VerifyEmail from '../components/verify-email';

interface IActionsProps {
  mode: 'verifyEmail' | 'resetPassword';
  oobCode: string;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { mode, oobCode } = context.query;

  if (!mode || !oobCode) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale as string, [
        'common',
        'auth',
        'firebase',
      ])),
      mode,
      oobCode,
    },
  };
};

const Action: React.FC<IActionsProps> = ({ mode, oobCode }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t('common:app_name')} | ${t(
          `common:page_title.${mode}`
        )}`}</title>
      </Head>
      <main className="hero is-flex is-justify-content-center is-align-items-center is-fullheight">
        {mode === 'resetPassword' ? (
          <ResetPasswordForm oobCode={oobCode} />
        ) : mode === 'verifyEmail' ? (
          <VerifyEmail oobCode={oobCode} />
        ) : null}
      </main>
    </>
  );
};

export default Action;
