import './style.scss';

type Props = { label: string };

export default function Submit({ label }: Props) {
  return (
    <button className='form-submit' type='submit'>
      {label}
    </button>
  );
}
