import { type ReactNode } from 'react';
import './style.scss';
import Button from '../../components/Button';
import { ArrowSvg } from '../../assets/svg';

type Props = {
  title: string;
  children: ReactNode;
  save: () => void;
  cancel: () => void;
};

export default function FormContainer({ title, children, save, cancel }: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save();
        cancel();
      }}
      className='form-container'
    >
      <div className='form-nav'>
        <Button icon={<ArrowSvg />} onClick={cancel} />
        <h2>{title}</h2>
        <Button type='submit' label='Done' />
      </div>

      <div className='form-content'>{children}</div>
    </form>
  );
}
