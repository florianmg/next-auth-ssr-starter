import { CgCloseO } from 'react-icons/cg';
import styles from './Modal.module.scss';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<IModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return <></>;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles['close-btn-container']}>
          <span role="button" className={styles.icon} onClick={onClose}>
            <CgCloseO />
          </span>
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
