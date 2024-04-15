import InputLabel from '../InputLabel';
import './style.scss';

type Props = {
  id: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
  className?: string;
  autofocus?: boolean;
};

export default function InputText({
  id,
  label,
  value,
  setValue,
  className,
  autofocus = false,
}: Props) {
  const elementId = id || `input-${label}`;

  return (
    <div className={`input-text-container ${className}`}>
      <InputLabel id={elementId} label={label} />

      <input
        className='input-text'
        type='text'
        placeholder={label}
        id={elementId}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus={autofocus}
        autoComplete='off'
      />
    </div>
  );
}
