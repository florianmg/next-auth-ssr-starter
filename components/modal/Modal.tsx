import { CgCloseO } from 'react-icons/cg';
import clx from 'classnames';
import styles from './Modal.module.scss';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  maxWidth?: number;
}

const Modal: React.FC<IModalProps> = ({
  children,
  isOpen,
  onClose,
  maxWidth = 960,
}) => {
  return (
    <div
      className={clx('modal', {
        'is-active': isOpen,
      })}
    >
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box">{children}</div>
      </div>
      <button
        onClick={onClose}
        className="modal-close is-large"
        aria-label="close"
      ></button>
    </div>
  );
};

export default Modal;
