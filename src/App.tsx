import './style.scss';
import Calculator from './apps/calculator';
import WindowWrapper from './containers/WindowWrapper';
import { CalculatorContextProvider } from './context/CalculatorContext';
import PulpitContainer from './containers/Pulpit';
import Nav from './containers/Nav';
import MinimalizedApp from './components/MinimalizedApp';
import { WindowApp } from './types/windowApp';
import { useApps } from './context/AppsContext';
import { TasksContextProvider } from './context/TodoListContext';
import Tasks from './apps/tasks';
import Button from './components/Button';

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
            <Button iconSrc={icon} alt={alt} onClick={onClick} disabled={disabledLauncher} />
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
