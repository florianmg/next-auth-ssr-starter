import Image from 'next/image';
import { useTranslation } from 'next-i18next';

interface IGoogleAuthProps {
  onClick: () => void;
}

const GoogleAuth: React.FC<IGoogleAuthProps> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <div className="field">
      <button
        className="button is-secondary is-fullwidth"
        type="button"
        onClick={onClick}
      >
        <Image
          src="/images/google-icon.png"
          width={25}
          height={25}
          alt="google icon"
        />
        <p className="ml-2">{t('auth:google_btn')}</p>
      </button>
    </div>
  );
};

export default GoogleAuth;
