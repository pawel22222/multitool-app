import InputLabel from '../InputLabel';
import './style.scss';

type Props = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function InputCheckbox({ id, label, checked, onChange, className }: Props) {
  return (
    <div className={`input-checkbox-container ${className}`}>
      <span>{label}</span>

      <input
        className='input-checkbox'
        type='checkbox'
        id={id}
        checked={checked}
        onChange={onChange}
      />

      <InputLabel id={id} label='' />
    </div>
  );
}
