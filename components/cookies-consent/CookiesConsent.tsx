import { useEffect, useState } from 'react';
import { setCookie, parseCookies } from 'nookies';

const CookieConsent = () => {
  const [isCookiesAccepted, setIsCookiesAccepted] = useState(false);

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies?.cookiesAccepted === '1') setIsCookiesAccepted(true);
  }, []);

  const handleValidate = () => {
    setCookie(null, 'cookiesAccepted', '1', {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    setIsCookiesAccepted(true);
  };

  if (isCookiesAccepted) return null;

  return (
    <div className="is-flex-direction-column notification is-info is-light navbar is-fixed-bottom is-flex is-align-items-flex-start">
      <p>Ce site enregistre des cookies pour fonctionner</p>
      <button className="button is-secondary mt-3" onClick={handleValidate}>
        Valider
      </button>
    </div>
  );
};

export default CookieConsent;
