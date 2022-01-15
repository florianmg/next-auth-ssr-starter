interface IErrorMessage {
  message: string;
}

const ErrorMessage: React.FC<IErrorMessage> = ({ message }) => {
  if (!message.length) return null;
  return (
    <div className="notification is-danger is-light">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
