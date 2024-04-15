/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from '@/App';
import AppsContextProvider from '@/context/AppsContext';
import { SettingsContextProvider } from '@/context/SettingsContext';

describe('App', () => {
  it('renders headline', () => {
    render(
      <AppsContextProvider>
        <SettingsContextProvider>
          <App />
        </SettingsContextProvider>
      </AppsContextProvider>,
    );
    const headline = screen.getByText(/Hello/i);
    expect(headline).toBeInTheDocument();
  });
});
