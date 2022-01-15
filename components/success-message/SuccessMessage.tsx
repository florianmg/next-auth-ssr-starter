interface ISuccessMessage {
  message: string;
}

const SuccessMessage: React.FC<ISuccessMessage> = ({ message }) => {
  if (!message.length) return null;
  return (
    <div className="notification is-success is-light">
      <p>{message}</p>
    </div>
  );
};
export default SuccessMessage;
