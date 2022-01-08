import styles from './Loader.module.scss';

interface ILoaderProps {
  size?: number;
}

const Loader: React.FC<ILoaderProps> = ({ size = 80 }) => (
  <div
    className={styles.loader}
    style={{
      width: size,
      height: size,
    }}
  >
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default Loader;
