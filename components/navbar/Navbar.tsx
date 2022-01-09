import { useAuth } from '../../hooks/useAuth';

import DefaultNavigation from './DefaultNavigation';
import LoggedNavigation from './LoggedNavigation';

const Navbar: React.FC = () => {
  const { user } = useAuth();

  return user !== null ? <LoggedNavigation /> : <DefaultNavigation />;
};

export default Navbar;
