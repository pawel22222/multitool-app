import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import AppsContextProvider from './context/AppsContext.tsx';
import { SettingsContextProvider } from './context/SettingsContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppsContextProvider>
      <SettingsContextProvider>
        <App />
      </SettingsContextProvider>
    </AppsContextProvider>
  </React.StrictMode>,
);
