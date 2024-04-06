import './style.scss';
import Calculator from './components/calculator';
import WindowWrapper from './containers/windowWrapper';
import { CalculatorContextProvider } from './context/CalculatorContext';
import PulpitContainer from './containers/pulpit';
import Nav from './containers/nav';
import MinimalizedApp from './components/minimalizedApp';
import { WindowApp } from './types/windowApp';
import { useApps } from './context/AppsContext';
import { TasksContextProvider } from './context/TodoListContext';
import Tasks from './components/tasks';
import AppLauncher from './components/appLauncher';

function App() {
  const { openedApps, focusedWindowId, actions } = useApps();
  const disabledLauncher = !(openedApps.length < 20);

  const appLauncher = [
    {
      onClick: () => actions.openApp('calculator'),
      icon: './calc-icon.png',
      alt: 'calculator icon',
    },
    {
      onClick: () => actions.openApp('tasks'),
      icon: './tasks-icon.png',
      alt: 'tasks icon',
    },
    {
      onClick: () => actions.openApp('other-app'),
      icon: './vite.svg',
      alt: 'other app',
    },
  ];

  function renderApp(app: WindowApp) {
    const { id, type } = app;

    switch (type) {
      case 'calculator':
        return (
          <CalculatorContextProvider key={id}>
            <WindowWrapper windowApp={app} isFocused={focusedWindowId === id}>
              <Calculator isFocused={focusedWindowId === id} />
            </WindowWrapper>
          </CalculatorContextProvider>
        );
      case 'tasks':
        return (
          <TasksContextProvider key={id}>
            <WindowWrapper windowApp={app} isFocused={focusedWindowId === id}>
              <Tasks />
            </WindowWrapper>
          </TasksContextProvider>
        );
      case 'other-app':
        return (
          <WindowWrapper key={id} windowApp={app} isFocused={focusedWindowId === id}>
            <div>other app</div>
          </WindowWrapper>
        );
      default:
        const never: never = type;
        throw new Error(never);
    }
  }

  const minimalizedAppOnClick = (id: string, isMinimalize: boolean) => {
    if (isMinimalize) {
      actions.setIsMinimalize(id, false);
      actions.handleSetFocusedWindowId(id);
    } else if (id === focusedWindowId) {
      actions.setIsMinimalize(id, true);
      actions.handleSetFocusedWindowId(null);
    } else {
      actions.handleSetFocusedWindowId(id);
    }
  };

  return (
    <div className='app-container light'>
      <div className='app-header'>
        <h1>Apps</h1>

        <Nav>
          {appLauncher.map(({ onClick, icon, alt }) => (
            <AppLauncher onClick={onClick} icon={icon} alt={alt} disabled={disabledLauncher} />
          ))}
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
              closeApp={() => actions.closeApp(id)}
              onClick={() => minimalizedAppOnClick(id, isMinimalize)}
              isFocused={focusedWindowId === id}
            />
          ))}
        </Nav>
      </div>
    </div>
  );
}

export default App;
