import './style.scss';
import { MouseEvent } from 'react';

type Props = {
  displayName: string;
  iconSrc: string;
  onClick: () => void;
  closeApp: () => void;
  isFocused: boolean;
};

export default function MinimalizedApp({
  displayName,
  iconSrc,
  onClick,
  closeApp,
  isFocused,
}: Props) {
  function handlerCloseApp(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    closeApp();
  }

  function handleOnClick(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    onClick();
  }

  return (
    <div
      className={`minimalized-app ${isFocused ? 'focused' : ''}`}
      role='presentation'
      onMouseDown={(e) => e.stopPropagation()}
      onClick={handleOnClick}
    >
      <img
        className='icon'
        src={iconSrc || './vite.svg'}
        alt={`${displayName} icon`}
        width='25px'
        height='25px'
      />

      <span className='label'>{displayName}</span>

      <button className='close' onClick={handlerCloseApp}>
        X
      </button>
    </div>
  );
}
