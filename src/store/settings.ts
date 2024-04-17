import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Theme } from '@/apps/Settings/types';

interface State {
  settings: {
    general: {
      theme: Theme;
    };
    personal: {
      name: string;
    };
  };
}

interface Actions {
  setTheme: (theme: Theme) => void;
  setName: (name: string) => void;
}

const myMiddlewares = (f: StateCreator<State & Actions>) => {
  return immer(devtools(persist(f, { name: 'settingsStore' })));
};

export const useSettings = create<State & Actions>()(
  myMiddlewares((set) => ({
    settings: {
      general: {
        theme: 'dark',
      },
      personal: {
        name: '',
      },
    },
    setTheme: (theme: Theme) => {
      set((state) => {
        state.settings.general.theme = theme;
        return state;
      });
    },
    setName: (name: string) => {
      set((state) => {
        state.settings.personal.name = name;
        return state;
      });
    },
  })),
);
