interface IButtonProps {
  type: 'submit' | 'button';
  value: string;
}

const Button: React.FC<IButtonProps> = ({ type, value }) => {
  return (
    <div className="field">
      <button className="button is-primary is-fullwidth" type={type}>
        {value}
      </button>
    </div>
  );
};

export default Button;
