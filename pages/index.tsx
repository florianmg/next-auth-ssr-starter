import type { NextPage } from 'next';
import Modal from '../components/modal';

const Home: NextPage = () => {
  return (
    <main>
      <Modal>
        <>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis
            eum hic vel adipisci a explicabo veniam similique ipsum id molestiae
            ex minus ut cum fugit suscipit cupiditate tempore, saepe facere.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis
            eum hic vel adipisci a explicabo veniam similique ipsum id molestiae
            ex minus ut cum fugit suscipit cupiditate tempore, saepe facere.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis
            eum hic vel adipisci a explicabo veniam similique ipsum id molestiae
            ex minus ut cum fugit suscipit cupiditate tempore, saepe facere.
          </p>
        </>
      </Modal>
      <h1>Home page</h1>
    </main>
  );
};

export default Home;
