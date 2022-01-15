import { cleanLabel } from '../../lib/helpers';

interface IInputText {
  type?: 'text' | 'password' | 'email';
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (newValue: string) => void;
  required?: boolean;
  minLength?: number;
}

const InputText: React.FC<IInputText> = ({
  type = 'text',
  label,
  placeholder = '',
  value,
  onChange,
  required = false,
  minLength = 0,
}) => {
  return (
    <div className="field">
      {label && (
        <label className="label" htmlFor={cleanLabel(label)}>
          {label}
        </label>
      )}
      <input
        minLength={minLength}
        id={label && cleanLabel(label)}
        required={required}
        className="input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
      />
    </div>
  );
};

export default InputText;
