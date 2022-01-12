import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ResetPasswordForm from '../components/reset-password';
import VerifyEmail from '../components/verify-email';

interface IActionsProps {
  mode: 'verifyEmail' | 'resetPassword';
  oobCode: string;
  apiKey: string;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { mode, oobCode, apiKey } = context.query;
  return {
    props: {
      ...(await serverSideTranslations(context.locale as string, [
        'common',
        'auth',
      ])),
      mode,
      oobCode,
      apiKey,
    },
  };
};

const Action: React.FC<IActionsProps> = ({ mode, oobCode, apiKey }) => {
  return (
    <main>
      <h1>Action page</h1>
      {mode === 'resetPassword' ? (
        <ResetPasswordForm oobCode={oobCode} />
      ) : mode === 'verifyEmail' ? (
        <VerifyEmail oobCode={oobCode} />
      ) : null}
    </main>
  );
};

export default Action;
