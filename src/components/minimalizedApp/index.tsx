import './style.scss';
import { MouseEvent } from 'react';

type Props = {
  name: string;
  setIsMinimalize: () => void;
  closeApp: () => void;
};

export default function MinimalizedApp({ name, setIsMinimalize, closeApp }: Props) {
  function handlerCloseApp(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    closeApp();
  }

  return (
    <div
      className='minimalized-app'
      role='button'
      tabIndex={0}
      onKeyDown={setIsMinimalize}
      onClick={setIsMinimalize}
    >
      <span className='label'>{name}</span>

      <button className='close' onClick={handlerCloseApp}>
        X
      </button>
    </div>
  );
}
