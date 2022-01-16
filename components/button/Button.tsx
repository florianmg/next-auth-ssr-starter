interface IButtonProps {
  type: 'submit' | 'button';
  value: string;
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = ({ type, value, disabled = false }) => {
  return (
    <div className="field">
      <button
        className="button is-primary is-fullwidth"
        type={type}
        disabled={disabled}
      >
        {value}
      </button>
    </div>
  );
};

export default Button;
