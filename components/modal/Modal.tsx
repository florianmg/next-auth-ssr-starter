import clx from 'classnames';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<IModalProps> = ({ children, isOpen, onClose }) => {
  return (
    <div
      className={clx('modal', {
        'is-active': isOpen,
      })}
    >
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content hapy-auth-modal">
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
