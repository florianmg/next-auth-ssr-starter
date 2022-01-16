interface IButtonProps {
  type: 'submit' | 'button';
  value: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<IButtonProps> = ({
  type,
  value,
  disabled = false,
  className = '',
  onClick,
}) => {
  return (
    <div className={`field ${className}`}>
      <button
        onClick={onClick}
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
