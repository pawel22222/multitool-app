import './style.scss';

type Props = {
  value: string;
  setValue: (value: string) => void;
  type?: 'text' | 'textarea';
  placeholder?: string;
  required?: boolean;
  className?: string;
  autoFocus?: boolean;
  testid?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function Input({
  value,
  setValue,
  type = 'text',
  placeholder = '',
  required = false,
  className = '',
  autoFocus = false,
  testid = '',
  onKeyDown = () => {},
}: Props) {
  return type === 'textarea' ? (
    <textarea
      className={`input-text ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      autoFocus={autoFocus}
      data-testid={testid}
      onKeyDown={onKeyDown}
      required={required}
    />
  ) : (
    <input
      className={`input-text ${className}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      autoFocus={autoFocus}
      data-testid={testid}
      onKeyDown={onKeyDown}
      required={required}
    />
  );
}
