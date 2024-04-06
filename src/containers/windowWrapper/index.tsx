import { type ReactNode, useRef, useState } from 'react';
import Draggable from 'react-draggable';
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
  const { id, isMinimalize, isFullscreen, zIndex, iconSrc, displayName, minSize } = windowApp;
  const { actions } = useApps();
  const [position, setPosition] = useState(calcDefaultPosition(zIndex));
  const windowWrapper = useRef<HTMLDivElement>(null);

  function calcDefaultPosition(zIndex: number, counter = 5, spaceX = 90, spaceY = 60) {
    const y =
      zIndex % (2 * counter) < counter
        ? zIndex % (2 * counter)
        : ((zIndex % counter) - counter) * -1;
    const x =
      zIndex % (4 * counter) < counter
        ? zIndex % counter
        : zIndex % (4 * counter) < 2 * counter
        ? counter
        : zIndex % (4 * counter) < 3 * counter
        ? ((zIndex % counter) - counter) * -1
        : 0;

    return { x: (x + 1) * spaceX, y: (y + 1) * spaceY };
  }

  return (
    !isMinimalize && (
      <Draggable
        defaultClassName='window-draggable'
        position={position}
        onMouseDown={(e) => {
          e.stopPropagation();
          actions.handleSetFocusedWindowId(id);
        }}
        onDrag={(e, ui) => {
          e.stopPropagation();
          const { x, y } = ui;

          setPosition({ x, y });
        }}
        handle='.window-header'
        cancel='.window-header-nav'
        bounds='.pulpit-container'
        nodeRef={windowWrapper}
      >
        <div
          ref={windowWrapper}
          className={`window-wrapper ${isFullscreen ? 'fullscreen' : ''} ${
            isFocused ? 'focused' : ''
          }
          `}
          style={{
            width: isFullscreen ? '100%' : minSize.width,
            height: isFullscreen ? '100%' : minSize.height,
            minWidth: isFullscreen ? '0' : minSize.width,
            minHeight: isFullscreen ? '0' : minSize.height,
            zIndex,
          }}
        >
          <OutsideMouseDownHandler
            className='window-helper-wrapper'
            onOutsideClick={() => actions.handleSetFocusedWindowId(null)}
          >
            <header className='window-header'>
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

              <nav className='window-header-nav'>
                <button
                  className='window-nav-button'
                  onClick={(e) => {
                    e.stopPropagation();
                    actions.setIsMinimalize(id, true);
                  }}
                >
                  _
                </button>
                <button
                  onClick={() => {
                    actions.setIsFullscreen(id, !isFullscreen);
                  }}
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
          </OutsideMouseDownHandler>
        </div>
      </Draggable>
    )
  );
}

export default WindowWrapper;
