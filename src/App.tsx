import { useState } from 'react';
import './style.scss';
import { v4 as uuidv4 } from 'uuid';
import Calculator from './components/calculator';
import WindowWrapper from './containers/windowWrapper';
import { CalculatorContextProvider } from './context/CalculatorContext';
import PulpitContainer from './containers/pulpit';
import Nav from './containers/nav';
import MinimalizedApp from './components/minimalizedApp';

export type WindowTypes = 'calculator' | 'other-app';
export interface WindowData {
  id: string;
  type: WindowTypes;
  isFullscreen: boolean;
  isMinimalize: boolean;
  minSize: { width: string; height: string };
}

function App() {
  const [openedApps, setOpenedApps] = useState<WindowData[]>([]);

  function createApp(type: WindowTypes): WindowData {
    const commonProps = { id: uuidv4(), type, isFullscreen: false, isMinimalize: false };
    const customProps = (() => {
      switch (type) {
        case 'calculator':
          return { minSize: { width: '420px', height: '600px' } };
        case 'other-app':
          return { minSize: { width: '420px', height: '100px' } };

        default:
          const never: never = type;
          return never;
      }
    })();

    return { ...commonProps, ...customProps };
  }

  function openApp(type: WindowTypes) {
    setOpenedApps((prev) => [...prev, createApp(type)]);
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

  function renderApp(app: WindowData) {
    switch (app.type) {
      case 'calculator':
        return (
          <CalculatorContextProvider key={app.id}>
            <WindowWrapper
              name='Calculator'
              windowData={app}
              closeApp={closeApp}
              setIsMinimalize={setIsMinimalize}
              setIsFullscreen={setIsFullscreen}
            >
              <Calculator />
            </WindowWrapper>
          </CalculatorContextProvider>
        );
      case 'other-app':
        return (
          <WindowWrapper
            key={app.id}
            name='Other app'
            windowData={app}
            closeApp={closeApp}
            setIsMinimalize={setIsMinimalize}
            setIsFullscreen={setIsFullscreen}
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
          <button onClick={() => openApp('other-app')}>Other app</button>
          <button onClick={() => openApp('calculator')}>Calculator</button>
        </Nav>
      </div>

      <div className='app-pulpit'>
        <PulpitContainer>{openedApps.map((app) => renderApp(app))}</PulpitContainer>
      </div>

      <div className='app-nav'>
        <Nav>
          {openedApps.map((app) => (
            <MinimalizedApp
              key={app.id}
              name={app.type}
              closeApp={() => closeApp(app.id)}
              setIsMinimalize={() => setIsMinimalize(app.id, !app.isMinimalize)}
            />
          ))}
        </Nav>
      </div>
    </div>
  );
}

export default App;
