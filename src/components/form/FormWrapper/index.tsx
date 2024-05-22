import './style.scss';
import { ReactNode } from 'react';

type Props = {
  submit: () => void;
  children: ReactNode;
  title?: string;
};

export default function FormWrapper({ submit, children, title }: Props) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit();
  }

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      {title && <h2 className='title'>{title}</h2>}

      {children}
    </form>
  );
}
