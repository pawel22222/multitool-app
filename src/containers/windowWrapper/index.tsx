import { ReactNode, useRef, useState } from 'react';
import './style.scss';
import { WindowApp } from '../../App';
import OutsideMouseDownHandler from '../OutsideMouseDownHandler';

interface Props {
  children: ReactNode;
  windowData: WindowApp;
  closeApp: (id: string) => void;
  setIsMinimalize: (id: string, isMinimalize: boolean) => void;
  setIsFullscreen: (id: string, isFullscreen: boolean) => void;
  isFocused: boolean;
  handleSetFocusedWindowId: (id: string | null) => void;
}

function WindowWrapper({
  children,
  windowData,
  closeApp,
  setIsMinimalize,
  setIsFullscreen,
  isFocused,
  handleSetFocusedWindowId,
}: Props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mouseDown, setMouseDown] = useState(false);
  const windowWrapper = useRef<HTMLDivElement>(null);
  const { id, isMinimalize, isFullscreen, zIndex, iconSrc, displayName } = windowData;

  return (
    !isMinimalize && (
      <OutsideMouseDownHandler onOutsideClick={() => handleSetFocusedWindowId(null)}>
        <div
          ref={windowWrapper}
          className={`
          window-wrapper 
          ${isFullscreen ? 'fullscreen' : ''} 
          ${isFocused ? 'focused' : ''}
        `}
          style={{
            top: isFullscreen ? 0 : `${position.y}px`,
            left: isFullscreen ? 0 : `${position.x}px`,
            zIndex,
          }}
          role='presentation'
          onMouseDown={(e) => {
            e.stopPropagation();
            handleSetFocusedWindowId(id);
          }}
        >
          <header
            role='presentation'
            className='window-header'
            onMouseDown={() => setMouseDown(true)}
            onMouseUp={() => setMouseDown(false)}
            onMouseMove={(e) => {
              if (mouseDown) {
                setPosition({
                  x: e.pageX - (windowWrapper.current?.offsetWidth || 0) / 3,
                  y: e.pageY - 120,
                });
              }
            }}
          >
            <div className='title-container'>
              <img
                className='icon'
                src={iconSrc || './vite.svg'}
                alt={`${displayName} icon`}
                width='15px'
                height='15px'
              />

              <span className='title'>{displayName}</span>
            </div>

            <nav
              role='presentation'
              className='window-header-nav'
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimalize(id, true);
                }}
                className='window-nav-button'
              >
                _
              </button>
              <button
                onClick={() => setIsFullscreen(id, !isFullscreen)}
                className='window-nav-button'
              >
                []
              </button>
              <button
                onClick={() => closeApp(id)}
                className='window-nav-button window-nav-button--close'
              >
                x
              </button>
            </nav>
          </header>

          <main className='window-main'>{children}</main>
        </div>
      </OutsideMouseDownHandler>
    )
  );
}

export default WindowWrapper;
