import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { Theme } from '@/apps/Settings/types';

interface Settings {
  general: {
    theme: Theme;
  };
  personal: {
    name: string;
  };
}

interface SettingsActions {
  setTheme: (theme: Theme) => void;
  setName: (name: string) => void;
}

const initialSettings: Settings = {
  general: {
    theme: 'dark',
  },
  personal: {
    name: '',
  },
};

const SettingsContext = createContext<{ settings: Settings; actions: SettingsActions } | null>(
  null,
);

export const SettingsContextProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState(initialSettings);

  const value = useMemo(
    () => ({
      settings,
      actions: {
        setTheme: (theme: Theme) => {
          setSettings((prev) => ({ ...prev, general: { ...prev.general, theme } }));
        },
        setName: (name: string) => {
          setSettings((prev) => ({ ...prev, personal: { ...prev.personal, name } }));
        },
      },
    }),
    [settings],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const settingsContext = useContext(SettingsContext);

  if (!settingsContext) {
    throw new Error('useSettings has to be used within <SettingsContext.Provider>');
  }

  return settingsContext;
};

export default SettingsContext.Provider;
