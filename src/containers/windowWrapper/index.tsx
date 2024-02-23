import { ReactNode } from 'react';
import './style.scss';
import { WindowData } from '../../App';

interface Props {
  children: ReactNode;
  name: string;
  windowData: WindowData;
  closeApp: (id: string) => void;
  setIsMinimalize: (id: string, isMinimalize: boolean) => void;
  setIsFullscreen: (id: string, isFullscreen: boolean) => void;
}

function WindowWrapper({
  children,
  name,
  windowData,
  closeApp,
  setIsMinimalize,
  setIsFullscreen,
}: Props) {
  return (
    !windowData.isMinimalize && (
      <div className={`window-wrapper ${windowData.isFullscreen ? 'fullscreen' : ''}`}>
        <header className='window-header'>
          <span className='window-header-name'>{name}</span>
          <nav className='window-header-nav'>
            <button
              onClick={() => setIsMinimalize(windowData.id, true)}
              className='window-nav-button'
            >
              _
            </button>
            <button
              onClick={() => setIsFullscreen(windowData.id, !windowData.isFullscreen)}
              className='window-nav-button'
            >
              []
            </button>
            <button
              onClick={() => closeApp(windowData.id)}
              className='window-nav-button window-nav-button--close'
            >
              x
            </button>
          </nav>
        </header>

        <main className='window-main'>{children}</main>
      </div>
    )
  );
}

export default WindowWrapper;
