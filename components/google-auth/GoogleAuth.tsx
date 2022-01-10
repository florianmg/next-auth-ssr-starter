import { useTranslation } from 'next-i18next';

interface IGoogleAuthProps {
  onClick: () => void;
}

const GoogleAuth: React.FC<IGoogleAuthProps> = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <div role="button" onClick={onClick}>
      {t('auth:google_btn')}
    </div>
  );
};

export default GoogleAuth;
