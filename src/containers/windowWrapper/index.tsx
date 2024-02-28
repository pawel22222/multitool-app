import { ReactNode, useRef, useState } from 'react';
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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mouseDown, setMouseDown] = useState(false);
  const windowWrapper = useRef<HTMLDivElement>(null);

  return (
    !windowData.isMinimalize && (
      <div
        ref={windowWrapper}
        className={`window-wrapper ${windowData.isFullscreen ? 'fullscreen' : ''}`}
        style={
          windowData.isFullscreen
            ? { top: 0, left: 0 }
            : { top: `${position.y}px`, left: `${position.x}px` }
        }
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
          <span className='window-header-name'>{name}</span>
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
                setIsMinimalize(windowData.id, true);
              }}
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
