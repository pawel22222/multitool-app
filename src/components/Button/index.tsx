import './style.scss';

type Props = {
  label?: string;
  icon?: JSX.Element;
  onClick?: () => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: string;
  dataTestid?: string;
};

export default function Button({
  label,
  icon,
  onClick = () => {},
  type = 'button',
  className = '',
  dataTestid = '',
}: Props) {
  return (
    <button
      type={type}
      className={`button ${className}`}
      data-testid={dataTestid}
      onClick={onClick}
    >
      {icon} {label && <span>{label}</span>}
    </button>
  );
}
