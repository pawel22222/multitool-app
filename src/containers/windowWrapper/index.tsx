import { type ReactNode, useRef, useState } from 'react';
import './style.scss';
import { WindowApp } from '../../types/windowApp';
import OutsideMouseDownHandler from '../OutsideMouseDownHandler';
import { useApps } from '../../context/AppsContext';

interface Props {
  children: ReactNode;
  windowApp: WindowApp;
  isFocused: boolean;
}

function WindowWrapper({ children, windowApp, isFocused }: Props) {
  const { actions } = useApps();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mouseDown, setMouseDown] = useState(false);
  const windowWrapper = useRef<HTMLDivElement>(null);
  const { id, isMinimalize, isFullscreen, zIndex, iconSrc, displayName, minSize } = windowApp;

  const onMoveWindow = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!windowWrapper.current) return;
    if (mouseDown) {
      setPosition({
        x: e.pageX - (windowWrapper.current.offsetWidth || 0) / 3,
        y: e.pageY - 140,
      });
    }
  };

  return (
    !isMinimalize && (
      <OutsideMouseDownHandler onOutsideClick={() => actions.handleSetFocusedWindowId(null)}>
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
            width: isFullscreen ? '100%' : minSize.width,
            height: isFullscreen ? '100%' : minSize.height,
            minWidth: isFullscreen ? '0' : minSize.width,
            minHeight: isFullscreen ? '0' : minSize.height,
            zIndex,
          }}
          role='presentation'
          onMouseDown={(e) => {
            e.stopPropagation();
            actions.handleSetFocusedWindowId(id);
          }}
        >
          <header
            role='presentation'
            className='window-header'
            onMouseDown={() => setMouseDown(true)}
            onMouseUp={() => setMouseDown(false)}
            onMouseMove={onMoveWindow}
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
                  actions.setIsMinimalize(id, true);
                }}
                className='window-nav-button'
              >
                _
              </button>
              <button
                onClick={() => actions.setIsFullscreen(id, !isFullscreen)}
                className='window-nav-button'
              >
                []
              </button>
              <button
                onClick={() => actions.closeApp(id)}
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
