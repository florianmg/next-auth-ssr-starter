import type { NextPage } from 'next';
import Loader from '../components/loader';
const Home: NextPage = () => {
  return (
    <main>
      <Loader size={30} />
      <h1>Home page</h1>
    </main>
  );
};

export default Home;
