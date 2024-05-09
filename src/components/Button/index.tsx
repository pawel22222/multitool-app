import './style.scss';

type Props = {
  label?: string;
  icon?: JSX.Element;
  iconSrc?: string;
  alt?: string;
  onClick?: () => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: string;
  testid?: string;
  disabled?: boolean;
};

export default function Button({
  label,
  icon,
  iconSrc = '',
  alt = '',
  onClick = () => {},
  type = 'button',
  className = '',
  testid = '',
  disabled = false,
}: Props) {
  return (
    <button
      type={type}
      className={`button ${className}`}
      data-testid={testid}
      onClick={onClick}
      disabled={disabled}
    >
      {iconSrc && <img className='icon' src={iconSrc} alt={alt} width='25px' height='25px' />}
      {icon} {label && <span>{label}</span>}
    </button>
  );
}
