import InputRadio from '../InputRadio';
import './style.scss';

interface Props<T> {
  label: string;
  values: { label: string; value: T }[];
  selected: T;
  setSelected: (value: T) => void;
}

export default function InputRadioFieldset<T>({ label, values, selected, setSelected }: Props<T>) {
  return (
    <fieldset className='input-radio-fieldset-container'>
      <legend className='legend'>{label}</legend>

      <div className='values'>
        {values.map(({ value, label }) => (
          <InputRadio
            key={label}
            id={`${label}-${value}`}
            label={label}
            value={value}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
    </fieldset>
  );
}
