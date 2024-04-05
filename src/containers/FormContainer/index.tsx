import { type ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
  save: () => void;
  cancel: () => void;
};

export default function FormContainer({ title, children, save, cancel }: Props) {
  return (
    <div className='form-container'>
      <div className='form-nav'>
        <button onClick={cancel}>{'<-'}</button>
        <h2>{title}</h2>
        <button onClick={save}>Done</button>
      </div>

      <div className='form-content'>{children}</div>
    </div>
  );
}
