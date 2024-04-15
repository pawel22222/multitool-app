import { createContext, useContext, useMemo, ReactNode, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AppProps, WindowApp, WindowAppTypes, WindowProps } from '@/types/windowApp';

// interface AppsActions

interface AppsContextValue {
  openedApps: WindowApp[];
  focusedWindowId: string | null;
  actions: {
    closeApp: (id: string) => void;
    closeAllApps: () => void;
    setIsMinimalize: (id: string, isMinimalize: boolean) => void;
    setIsFullscreen: (id: string, isFullscreen: boolean) => void;
    handleSetFocusedWindowId: (id: string | null) => void;
    openApp: (type: WindowAppTypes) => void;
  };
}

const AppsContext = createContext<AppsContextValue | null>(null);

const AppsContextProvider = ({ children }: { children: ReactNode }) => {
  const [openedApps, setOpenedApps] = useState<WindowApp[]>([]);
  const [focusedWindowId, setFocusedWindowId] = useState<string | null>(null);

  const getBiggestZIndex = useCallback(() => {
    return openedApps.reduce((acc, { zIndex }) => {
      if (acc < zIndex) {
        return zIndex;
      }
      return acc;
    }, 0);
  }, [openedApps]);

  const increaseZIndex = useCallback(
    (id: string | null) => {
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
    },
    [getBiggestZIndex],
  );

  const createApp = useCallback(
    (type: WindowAppTypes): WindowApp => {
      const biggestZIndex = getBiggestZIndex();

      const appProps = ((): AppProps => {
        switch (type) {
          case 'calculator':
            return {
              iconSrc: './calc-icon.png',
              displayName: 'Calculator',
              minSize: { width: '420px', height: '600px' },
              canOpenMultiWindow: true,
            };
          case 'tasks':
            return {
              iconSrc: './tasks-icon.png',
              displayName: 'Tasks',
              minSize: { width: '420px', height: '600px' },
              canOpenMultiWindow: true,
            };
          case 'settings':
            return {
              iconSrc: './settings-icon.png',
              displayName: 'Settings',
              minSize: { width: '600px', height: '400px' },
              canOpenMultiWindow: false,
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
    },
    [getBiggestZIndex],
  );

  const handleSetFocusedWindowId = useCallback(
    (id: string | null) => {
      increaseZIndex(id);
      setFocusedWindowId(id);
    },
    [increaseZIndex],
  );

  const openApp = useCallback(
    (type: WindowAppTypes) => {
      if (openedApps.length >= 20) return;
      const newApp = createApp(type);

      if (newApp.canOpenMultiWindow) {
        setOpenedApps((prev) => [...prev, newApp]);
        handleSetFocusedWindowId(newApp.id);
      } else {
        const aa = openedApps.find((app) => app.type === newApp.type);

        if (aa) {
          handleSetFocusedWindowId(aa.id);
        } else {
          setOpenedApps((prev) => [...prev, newApp]);
          handleSetFocusedWindowId(newApp.id);
        }
      }
    },
    [createApp, handleSetFocusedWindowId, openedApps],
  );

  function closeApp(id: string) {
    setOpenedApps((prev) => prev.filter((app) => app.id !== id));
  }

  function closeAllApps() {
    setOpenedApps([]);
  }

  const setIsMinimalize = useCallback(
    (id: string, isMinimalize: boolean) => {
      setOpenedApps((prev) => {
        return prev.map((app) => {
          if (app.id === id) {
            app.isMinimalize = isMinimalize;

            if (id === focusedWindowId) {
              setFocusedWindowId(null);
            }
          }
          return app;
        });
      });
    },
    [focusedWindowId],
  );

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

  const value = useMemo(
    () => ({
      openedApps,
      focusedWindowId,
      actions: {
        closeApp,
        setIsMinimalize,
        setIsFullscreen,
        handleSetFocusedWindowId,
        openApp,
        closeAllApps,
      },
    }),
    [focusedWindowId, handleSetFocusedWindowId, openApp, openedApps, setIsMinimalize],
  );

  return <AppsContext.Provider value={value}>{children}</AppsContext.Provider>;
};

export const useApps = () => {
  const appsContext = useContext(AppsContext);

  if (!appsContext) {
    throw new Error('useApps has to be used within <AppsContext.Provider>');
  }

  return appsContext;
};

export default AppsContextProvider;
