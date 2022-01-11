import styles from './ErrorMessage.module.scss';

interface IErrorMessage {
  message: string;
}

const ErrorMessage: React.FC<IErrorMessage> = ({ message }) => {
  if (!message.length) return null;
  return (
    <div className={styles.container}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
