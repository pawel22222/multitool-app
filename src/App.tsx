import { useState } from 'react';
import './style.scss';
import { v4 as uuidv4 } from 'uuid';
import Calculator from './components/calculator';
import WindowWrapper from './containers/windowWrapper';
import { CalculatorContextProvider } from './context/CalculatorContext';
import PulpitContainer from './containers/pulpit';
import Nav from './containers/nav';
import MinimalizedApp from './components/minimalizedApp';

export type WindowAppTypes = 'calculator' | 'other-app';
interface WindowProps {
  id: string;
  type: WindowAppTypes;
  isFullscreen: boolean;
  isMinimalize: boolean;
  zIndex: number;
}
interface AppProps {
  displayName: string;
  iconSrc: string;
}
export interface WindowApp extends WindowProps, AppProps {}

function App() {
  const [openedApps, setOpenedApps] = useState<WindowApp[]>([]);
  const [focusedWindowId, setFocusedWindowId] = useState<string | null>(null);

  function createApp(type: WindowAppTypes): WindowApp {
    const biggestZIndex = getBiggestZIndex();

    const appProps = ((): AppProps => {
      switch (type) {
        case 'calculator':
          return {
            iconSrc: './calc-icon.png',
            displayName: 'Calculator',
          };
        case 'other-app':
          return {
            iconSrc: './vite.svg',
            displayName: 'Other App',
          };

        default:
          const never: never = type;
          return never;
      }
    })();

    const initialProps: WindowProps = {
      id: uuidv4(),
      type,
      isFullscreen: false,
      isMinimalize: false,
      zIndex: biggestZIndex + 1,
    };

    return {
      ...initialProps,
      ...appProps,
    };
  }

  function getBiggestZIndex() {
    return openedApps.reduce((acc, { zIndex }) => {
      if (acc < zIndex) {
        return zIndex;
      }
      return acc;
    }, 0);
  }

  function handleSetFocusedWindowId(id: string | null) {
    increaseZIndex(id);
    setFocusedWindowId(id);
  }

  function openApp(type: WindowAppTypes) {
    const newApp = createApp(type);
    setOpenedApps((prev) => [...prev, newApp]);
    handleSetFocusedWindowId(newApp.id);
  }

  function closeApp(id: string) {
    setOpenedApps((prev) => prev.filter((app) => app.id !== id));
  }

  function setIsMinimalize(id: string, isMinimalize: boolean) {
    setOpenedApps((prev) => {
      return prev.map((app) => {
        if (app.id === id) {
          app.isMinimalize = isMinimalize;
        }
        return app;
      });
    });
  }

  function setIsFullscreen(id: string, isFullscreen: boolean) {
    setOpenedApps((prev) => {
      return prev.map((app) => {
        if (app.id === id) {
          app.isFullscreen = isFullscreen;
        }
        return app;
      });
    });
  }

  function increaseZIndex(id: string | null) {
    if (!id) return;
    const biggestZIndex = getBiggestZIndex();

    setOpenedApps((prev) => {
      return prev.map((app) => {
        if (app.id === id) {
          app.zIndex = biggestZIndex + 1;
        }
        return app;
      });
    });
  }

  function renderApp(app: WindowApp) {
    switch (app.type) {
      case 'calculator':
        return (
          <CalculatorContextProvider key={app.id}>
            <WindowWrapper
              windowData={app}
              closeApp={closeApp}
              setIsMinimalize={setIsMinimalize}
              setIsFullscreen={setIsFullscreen}
              isFocused={focusedWindowId === app.id}
              handleSetFocusedWindowId={handleSetFocusedWindowId}
            >
              <Calculator isFocused={focusedWindowId === app.id} />
            </WindowWrapper>
          </CalculatorContextProvider>
        );
      case 'other-app':
        return (
          <WindowWrapper
            key={app.id}
            windowData={app}
            closeApp={closeApp}
            setIsMinimalize={setIsMinimalize}
            setIsFullscreen={setIsFullscreen}
            isFocused={focusedWindowId === app.id}
            handleSetFocusedWindowId={handleSetFocusedWindowId}
          >
            <div>other app</div>
          </WindowWrapper>
        );
      default:
        const never: never = app.type;
        throw new Error(never);
    }
  }

  return (
    <div className='app-container light'>
      <div className='app-header'>
        <h1>Apps</h1>
        <Nav>
          <button onClick={() => openApp('calculator')}>
            <img src='./calc-icon.png' alt='calculator app' width='25px' height='25px' />
          </button>

          <button onClick={() => openApp('other-app')}>
            <img src='./vite.svg' alt='other app' width='25px' height='25px' />
          </button>
        </Nav>
      </div>

      <div className='app-pulpit'>
        <PulpitContainer>{openedApps.map((app) => renderApp(app))}</PulpitContainer>
      </div>

      <div className='app-nav'>
        <Nav>
          {openedApps.map(({ id, isMinimalize, displayName, iconSrc }) => (
            <MinimalizedApp
              key={id}
              displayName={displayName}
              iconSrc={iconSrc}
              closeApp={() => closeApp(id)}
              onClick={() => {
                if (isMinimalize) {
                  setIsMinimalize(id, false);
                  handleSetFocusedWindowId(id);
                } else if (id === focusedWindowId) {
                  setIsMinimalize(id, true);
                  handleSetFocusedWindowId(null);
                } else {
                  handleSetFocusedWindowId(id);
                }
              }}
              isFocused={focusedWindowId === id}
            />
          ))}
        </Nav>
      </div>
    </div>
  );
}

export default App;
