import './style.scss';

type Props = {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  required?: boolean;
  className?: string;
  autoFocus?: boolean;
  dataTestid?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function Input({
  value,
  setValue,
  placeholder,
  required = false,
  className = '',
  autoFocus = false,
  dataTestid = '',
  onKeyDown = () => {},
}: Props) {
  return (
    <input
      className={`input-text ${className}`}
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      autoFocus={autoFocus}
      data-testid={dataTestid}
      onKeyDown={onKeyDown}
      required={required}
    />
  );
}
