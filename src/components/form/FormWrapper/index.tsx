import './style.scss';
import { ReactNode } from 'react';

type Props = {
  submit: () => void;
  children: ReactNode;
};

export default function FormWrapper({ submit, children }: Props) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit();
  }

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      {children}
    </form>
  );
}
