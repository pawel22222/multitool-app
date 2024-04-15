import InputLabel from '../InputLabel';
import './style.scss';

type Props<T> = {
  id: string;
  label: string;
  value: T;
  selected: T;
  setSelected: (value: T) => void;
  className?: string;
};

export default function InputRadio<T>({
  id,
  label,
  value,
  selected,
  setSelected,
  className,
}: Props<T>) {
  const elementId = id || `input-${label}`;

  return (
    <div className={`input-radio-container ${className}`}>
      <input
        className='input-radio'
        type='radio'
        id={`${label}-${value}`}
        checked={selected === value}
        onChange={() => setSelected(value)}
      />

      <InputLabel id={elementId} label={label} />
    </div>
  );
}
