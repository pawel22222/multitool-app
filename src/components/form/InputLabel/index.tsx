import './style.scss';

type Props = {
  label: string;
  id: string;
  className?: string;
};

export default function InputLabel({ label, id, className }: Props) {
  return (
    <label className={`input-label ${className}`} htmlFor={id}>
      {label}
    </label>
  );
}
