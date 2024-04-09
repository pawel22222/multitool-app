/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from '@/App';
import AppsContextProvider from '@/context/AppsContext';

describe('App', () => {
  it('renders headline', () => {
    render(
      <AppsContextProvider>
        <App />
      </AppsContextProvider>,
    );
    const headline = screen.getByText(/Apps/i);
    expect(headline).toBeInTheDocument();
  });
});
